import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FormPage from './pages/Form.page';
import NotesPage from './pages/Notes.page';
import UpdatePage from './pages/Update.page';
import HomePage from './pages/Home.page';
import NotesNav from './components/Nav.component'; 

function App() {
  return (
    <Router>
      <NotesNav />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/notes" component={NotesPage} />
        <Route path="/new" component={FormPage} />
        <Route path="/update" component={UpdatePage} />
      </Switch>
    </Router>
  );
}

export default App;
