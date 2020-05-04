import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FormPage from './pages/Form.page';
import NotesPage from './pages/Notes.page';
import UpdatePage from './pages/Update.page';
import HomePage from './pages/Home.page';
import RegisterPage from './pages/Register.page';
import NotesNav from './components/Nav.component';

require('./redux/store');

function App() {
  const [ isAuthenticated, Authenticate ] = useState(false);

  return (
    <Router>
      <NotesNav isAuthenticated={isAuthenticated} toggleAuth={Authenticate} />
      <Switch>
      {
        !isAuthenticated ? 
        <>
          <Route exact path="/">
            <HomePage toggleAuth={Authenticate} />
          </Route>
          <Route path="/register" component={RegisterPage} />
        </>
          :
        <>
          <Route path="/" component={NotesPage} />
          <Route path="/new" component={FormPage} />
          <Route path="/update" component={UpdatePage} />
        </>
      }
      </Switch>
    </Router>
  );
}

export default App;
