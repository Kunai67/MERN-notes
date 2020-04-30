import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FormPage from './pages/Form.page';
import NotesPage from './pages/Notes.page';
import UpdatePage from './pages/Update.page';
import HomePage from './pages/Home.page';
import RegisterPage from './pages/Register.page';
import NotesNav from './components/Nav.component'; 

function App() {
  const [ isAuthenticated, Authenticate ] = useState(false);

  if (!isAuthenticated) {
    return (
      <Router>
        <NotesNav />
        <Switch>
          <Route exact path="/">
            <HomePage toggleAuth={Authenticate} />
          </Route>
          <Route path="/register" component={RegisterPage} />
        </Switch>
      </Router>
    );
  } else {
    return (
      <Router>
        <NotesNav />
        <Switch>
          <Route path="/" component={NotesPage} />
          <Route path="/new" component={FormPage} />
          <Route path="/update" component={UpdatePage} />
        </Switch>
      </Router>
    )
  }
}

export default App;
