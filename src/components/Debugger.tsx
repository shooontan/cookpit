/** @jsx h */
import { Fragment, FunctionalComponent, h } from 'preact';

import { useCommand } from '../hooks/useCommand';
import { useDebugger } from '../hooks/useDebugger';

export const Debugger: FunctionalComponent = () => {
  const { running, debuggeeId, error, start, stop } = useDebugger();
  useCommand(debuggeeId);

  return (
    <Fragment>
      <p>
        Debugger:
        {running ? 'Running' : 'Stop'}
      </p>
      {error && <p>{error}</p>}
      <button onClick={start} disabled={running}>
        Start
      </button>
      <button onClick={stop} disabled={!running}>
        Stop
      </button>
    </Fragment>
  );
};
