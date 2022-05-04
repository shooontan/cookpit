export const method = {
  FETCH_CONTINUE_REQUEST: 'Fetch.continueRequest',
  FETCH_ENABLE: 'Fetch.enable',
  FETCH_FULFILL_REQUEST: 'Fetch.fulfillRequest',
  FETCH_GET_RESPONSE_BODY: 'Fetch.getResponseBody',
} as const;

export type Method = typeof method[keyof typeof method];

export type HeaderEntry = {
  name: string;
  value: string;
};

export type CommandParams = {
  [method.FETCH_CONTINUE_REQUEST]: FetchContinueRequest;
  [method.FETCH_ENABLE]: FetchEnableCommandParams;
  [method.FETCH_FULFILL_REQUEST]: FetchFulfillRequest;
  [method.FETCH_GET_RESPONSE_BODY]: FetchGetResponseBody;
};

export type FetchContinueRequest = {
  requestId: string;
  url?: string;
  method?: string;
  postData?: string;
  headers?: HeaderEntry[];
  interceptResponse?: boolean;
};

export type FetchEnableCommandParams = {
  patterns?: {
    urlPattern: string;
    resourceType?: string;
    requestStage?: 'Request' | 'Response';
  }[];
  handleAuthRequests?: boolean;
};

export type FetchFulfillRequest = {
  requestId: string;
  responseCode: number;
  responseHeaders?: HeaderEntry[];
  binaryResponseHeaders?: string;
  body?: string;
  responsePhrase?: string;
};

export type FetchGetResponseBody = {
  requestId: string;
};

export type CommandResult = {
  [method.FETCH_CONTINUE_REQUEST]: void;
  [method.FETCH_ENABLE]: void;
  [method.FETCH_FULFILL_REQUEST]: void;
  [method.FETCH_GET_RESPONSE_BODY]: {
    body: string;
    base64Encoded: string;
  };
};

export const event = {
  FETCH_REQUEST_PAUSED: 'Fetch.requestPaused',
} as const;

export type Event = typeof event[keyof typeof event];

export type EventParams = {
  [event.FETCH_REQUEST_PAUSED]: FetchContinueRequest;
};

export type FetchRequestPaused = {
  requestId: string;
  request: {
    url: string;
    urlFragment?: string;
    method: string;
    headers: Record<string, unknown>;
    postData?: string;
    hasPostData?: boolean;
    postDataEntries?: {
      bytes?: string;
    };
    mixedContentType?: 'blockable' | 'optionally-blockable' | 'none';
    initialPriority: 'VeryLow' | 'Low' | 'Medium' | 'High' | 'VeryHigh';
    referrerPolicy:
      | 'unsafe-url'
      | 'no-referrer-when-downgrade'
      | 'no-referrer'
      | 'origin'
      | 'origin-when-cross-origin'
      | 'same-origin'
      | 'strict-origin'
      | 'strict-origin-when-cross-origin';
    isLinkPreload?: boolean;
    trustTokenParams?: {
      type: 'Issuance' | 'Redemption' | 'Signing';
      refreshPolicy: 'UseCached' | 'Refresh';
      issuers?: string[];
    };
    isSameSite?: boolean;
  };
  frameId: string;
  resourceType:
    | 'Document'
    | 'Stylesheet'
    | 'Image'
    | 'Media'
    | 'Font'
    | 'Script'
    | 'TextTrack'
    | 'XHR'
    | 'Fetch'
    | 'EventSource'
    | 'WebSocket'
    | 'Manifest'
    | 'SignedExchange'
    | 'Ping'
    | 'CSPViolationReport'
    | 'Preflight'
    | 'Other';
  responseErrorReason:
    | 'Failed'
    | 'Aborted'
    | 'TimedOut'
    | 'AccessDenied'
    | 'ConnectionClosed'
    | 'ConnectionReset'
    | 'ConnectionRefused'
    | 'ConnectionAborted'
    | 'ConnectionFailed'
    | 'NameNotResolved'
    | 'InternetDisconnected'
    | 'AddressUnreachable'
    | 'BlockedByClient'
    | 'BlockedByResponse';
  responseStatusCode: number;
  responseStatusText: string;
  responseHeaders: HeaderEntry[];
  networkId: string;
};

export type Debuggee = Parameters<typeof chrome.debugger.sendCommand>[0];
