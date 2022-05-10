import { useContext, useEffect } from 'preact/hooks';

import { chromeDebugger } from '../services/chrome/Chrome';
import { RuleContext } from '../features/rule';

export const useCommand = (debuggeeId?: number) => {
  const { state } = useContext(RuleContext);
  const { rules } = state;

  useEffect(() => {
    if (typeof debuggeeId === 'number') {
      chromeDebugger.overrideResponse(rules);
    }
    return () => {
      chromeDebugger.clearResponse();
    };
  }, [debuggeeId, rules]);

  return {};
};
