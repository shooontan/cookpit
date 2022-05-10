import {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'preact/hooks';

import { ChromeDebugger, chromeDebugger } from '../services/chrome/Chrome';
import { DebuggerContext } from '../store/debugger';
import { debuggerActtions } from '../store/debugger/actions';
import { AppError } from '../store/error/state';

const queryInfo = {
  active: true,
  currentWindow: true,
};

export const useDebugger = () => {
  const [debuggeeId, setDebuggeeId] = useState<number | null>();
  const [error, setError] = useState<AppError>();
  const { state, dispatch } = useContext(DebuggerContext);

  const debuggerClient = useRef<ChromeDebugger>(chromeDebugger);
  const client = debuggerClient.current;

  const running = state.active;

  useEffect(() => {
    (async () => {
      const tabs = await client.tabsQuery(queryInfo);
      const target = {
        tabId: tabs[0].id,
      };

      const isEnabled = await client.isEnabled(target, {
        updateTarget: true,
      });
      if (isEnabled) {
        setDebuggeeId(target.tabId);
        start();
      } else {
        setDebuggeeId(null);
        stop();
      }
    })();
  }, []);

  /**
   * activate debugger
   */
  useEffect(() => {
    const letActivate = running && debuggeeId === null;
    if (!letActivate) {
      return;
    }

    (async () => {
      const tabs = await client.tabsQuery(queryInfo);
      const target = {
        tabId: tabs[0].id,
      };
      await client.attach(target, '1.3');
      await client
        .sendCommand('Fetch.enable', {
          patterns: [
            {
              urlPattern: '*',
              requestStage: 'Response',
            },
          ],
        })
        .then(() => {
          setDebuggeeId(target.tabId);
        })
        .catch((error) => {
          setError(error);
        });
    })();
  }, [running, debuggeeId]);

  /**
   * deactivate debugger
   */
  useEffect(() => {
    const letDeactivate = !running && typeof debuggeeId === 'number';
    if (!letDeactivate) {
      return;
    }

    client
      .detach()
      .then(() => {
        setDebuggeeId(null);
      })
      .catch((error) => {
        setError(error);
      });
  }, [running, debuggeeId]);

  const start = useCallback(() => {
    dispatch(debuggerActtions.startDebugger());
  }, []);

  const stop = useCallback(() => {
    dispatch(debuggerActtions.stopDebugger());
  }, []);

  return {
    running: state.active,
    debuggeeId,
    error,
    start,
    stop,
  };
};
