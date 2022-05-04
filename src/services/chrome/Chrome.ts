import { Rule } from '../../store/rule/state';
import { base64 } from '../../utils/base64';
import {
  CommandParams,
  CommandResult,
  Debuggee,
  event,
  FetchRequestPaused,
  Method,
} from './type';

export class ChromeDebugger {
  private source?: Debuggee;

  private rules: Rule[] = [];

  async tabsQuery(queryInfo: chrome.tabs.QueryInfo) {
    return new Promise<chrome.tabs.Tab[]>((resolve) => {
      chrome.tabs.query(queryInfo, (tabs) => {
        return resolve(tabs);
      });
    });
  }

  async sendCommand<MethodName extends Method>(
    method: MethodName,
    commandParams?: CommandParams[MethodName]
  ) {
    return chrome.debugger
      .sendCommand(this.getSource(), method, commandParams)
      .then((res) => res as unknown as CommandResult[MethodName]);
  }

  async attach(target: Debuggee, requiredVersion: string) {
    return new Promise<void>((resolve) => {
      chrome.debugger.attach(target, requiredVersion, () => {
        this.source = target;
        resolve();
      });
    });
  }

  async detach() {
    return new Promise<void>((resolve) => {
      chrome.debugger.detach(this.getSource(), () => {
        this.source = undefined;
        resolve();
      });
    });
  }

  overrideResponse(rules: Rule[]) {
    this.rules = rules;
    chrome.debugger.onEvent.addListener(this.override);
  }

  clearResponse() {
    this.rules = [];
    chrome.debugger.onEvent.removeListener(this.override);
  }

  private override = async (_: Debuggee, method: string, params?: unknown) => {
    if (!isFetchRequestPaused(method, params)) {
      return;
    }

    const matchedRule = this.rules.find((rule) => {
      const reg = new RegExp(rule.url);
      return reg.test(params.request.url);
    });

    if (!matchedRule) {
      await this.sendCommand('Fetch.continueRequest', {
        requestId: params.requestId,
      }).catch((error) => {
        console.log(error);
      });
      return;
    }

    const response = await this.sendCommand('Fetch.getResponseBody', {
      requestId: params.requestId,
    }).catch((error) => {
      console.log(error);
    });

    if (!response) {
      return;
    }

    let body = response.body;
    if (matchedRule) {
      body = base64.encode(matchedRule.body);
    }

    const commandParams = {
      requestId: params.requestId,
      responseCode: params.responseStatusCode,
      responseHeaders: params.responseHeaders,
      body: body,
    };

    await this.sendCommand('Fetch.fulfillRequest', commandParams);
  };

  private getSource() {
    if (!this.source) {
      throw new Error('chrome debuggee does not exist.');
    }
    return this.source;
  }
}

export const chromeDebugger = new ChromeDebugger();

const isFetchRequestPaused = (
  method: string,
  params: unknown
): params is FetchRequestPaused =>
  method === event.FETCH_REQUEST_PAUSED &&
  Object.prototype.hasOwnProperty.call(params, 'resourceType');
