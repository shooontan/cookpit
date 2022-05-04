/** @jsx h */
import { h, render } from 'preact';

import { Add } from './components/Add';
import { Debugger } from './components/Debugger';
import { Table } from './components/Table';
import { DebuggerProvider } from './store/debugger';
import { ErrorProvider } from './store/error';
import { RuleProvider } from './store/rule';

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
