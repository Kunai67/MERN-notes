import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FormPage from './pages/Form.page';
import NotesPage from './pages/Notes.page';
import UpdatePage from './pages/Update.page';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={NotesPage} />
        <Route path="/new" component={FormPage} />
        <Route path="/update" component={UpdatePage} />
      </Switch>
    </Router>
  );
}

export default App;
