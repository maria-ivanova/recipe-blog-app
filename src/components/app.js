import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronDown, faUser, faHeart } from '@fortawesome/free-solid-svg-icons';

import { AuthUserContext } from '../context/context.js';
import { auth } from "../services/firebase.js";

import ROUTES from '../constants/routes.js';
import Header from './header.js';
import Topmenu from './topmenu.js'
import Footer from './footer.js';
import Home from './home.js';
import Login from './login.js';
import Register from './register.js';
import Profile from './profile.js';
import NotFound from './notFound.js';

library.add(faChevronDown, faUser, faHeart);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged(authUser => {
      this.setState({ authUser });
    })
  }

  render() {
    return (
      <AuthUserContext.Provider value={this.state.authUser}>
        <BrowserRouter>
          <Header />
          <Topmenu />

          <Switch>
            <Route exact path={ROUTES.HOME} component={Home} />
            <Route path={ROUTES.LOGIN} component={Login} />
            <Route path={ROUTES.REGISTER} component={Register} />
            <Route path={ROUTES.PROFILE} component={Profile} />
            <Route path="" component={NotFound} />
          </Switch>

          <Footer />
        </BrowserRouter>
      </AuthUserContext.Provider>
    );
  }
}

export default App;
