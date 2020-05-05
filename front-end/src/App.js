import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FormPage from './pages/Form.page';
import NotesPage from './pages/Notes.page';
import UpdatePage from './pages/Update.page';
import HomePage from './pages/Home.page';
import RegisterPage from './pages/Register.page';
import NotesNav from './components/Nav.component';
import ErrorPage from './pages/404.page';
import { Provider } from 'react-redux';
import { store } from './redux/store';

function App() {
  const [ isAuthenticated, Authenticate ] = useState(Object.keys(store.getState().user).length > 0);

  store.subscribe(() => Authenticate(Object.keys(store.getState().user).length > 0));

  return (
    <Provider store={store}>
      <Router>
        <NotesNav isAuthenticated={isAuthenticated} />
        {
          !isAuthenticated ? 
          <Switch>
            <Route path="/register" component={RegisterPage} />
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route component={ErrorPage} />
          </Switch>
            :
          <Switch>
            <Route path="/new" component={FormPage} />
            <Route path="/update" component={UpdatePage} />
            <Route exact path="/" component={NotesPage} />
            <Route component={ErrorPage} />
          </Switch>
        }
      </Router>
    </Provider>
  );
}

export default App;
