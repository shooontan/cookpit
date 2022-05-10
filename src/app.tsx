/** @jsx h */
import { h, render } from 'preact';

import { Add } from './components/Add';
import { Debugger } from './components/Debugger';
import { Table } from './components/Table';
import { DebuggerProvider } from './features/debugger';
import { ErrorProvider } from './features/error';
import { RuleProvider } from './features/rule';

const App = () => {
  return (
    <ErrorProvider>
      <RuleProvider>
        <DebuggerProvider>
          <Debugger />
          <div>
            <div>
              <Add>Add</Add>
            </div>
            <Table />
          </div>
        </DebuggerProvider>
      </RuleProvider>
    </ErrorProvider>
  );
};

render(<App />, document.body);
