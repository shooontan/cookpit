import { useCallback, useContext, useEffect, useState } from 'preact/hooks';

import { chromeDebugger } from '../services/chrome/Chrome';
import { DebuggerContext } from '../store/debugger';
import { debuggerActtions } from '../store/debugger/actions';
import { AppError } from '../store/error/state';

const queryInfo = {
  active: true,
  currentWindow: true,
};

export const useDebugger = () => {
  const [debuggeeId, setDebuggeeId] = useState<number>();
  const [error, setError] = useState<AppError>();
  const { state, dispatch } = useContext(DebuggerContext);

  const running = state.active;

  useEffect(() => {
    if (!running) {
      return;
    }

    (async () => {
      const tabs = await chromeDebugger.tabsQuery(queryInfo);
      const target = {
        tabId: tabs[0].id,
      };
      await chromeDebugger.attach(target, '1.3');
      await chromeDebugger
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
  }, [running]);

  useEffect(() => {
    if (running || typeof debuggeeId !== 'number') {
      return;
    }

    chromeDebugger
      .detach()
      .then(() => {
        setDebuggeeId(undefined);
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
