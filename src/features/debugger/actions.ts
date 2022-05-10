const START_DEBUGGER = 'START_DEBUGGER';
const STOP_DEBUGGER = 'STOP_DEBUGGER';

export const actionTypes = {
  START_DEBUGGER,
  STOP_DEBUGGER,
} as const;

const startDebugger = () => ({
  type: actionTypes.START_DEBUGGER,
});

const stopDebugger = () => ({
  type: actionTypes.STOP_DEBUGGER,
});

export const debuggerActtions = {
  startDebugger,
  stopDebugger,
};

export type DebuggerActionType =
  | ReturnType<typeof startDebugger>
  | ReturnType<typeof stopDebugger>;
