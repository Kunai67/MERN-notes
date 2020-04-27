import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FormPage from './pages/Form.page';
import NotesPage from './pages/Notes.page';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={NotesPage} />
        <Route path="/new" component={FormPage} />
      </Switch>
    </Router>
  );
}

export default App;
