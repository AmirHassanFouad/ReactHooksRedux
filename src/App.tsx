import './App.css';
import React from 'react';

import { Route, Switch } from 'react-router-dom';
import { TodosComponent } from './components/Controls/todos/todos';

const App: React.FC = () => {
  return (
    <>
      <h2 className="header-title">React Assingment Redux Using Hooks</h2>
      <main className="Content">
        <Switch>
          <Route path="/todos" component={TodosComponent} />
          <Route path="/" component={TodosComponent} />
        </Switch>
      </main>
    </>
  );
};

export default App;
