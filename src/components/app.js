import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect  } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronDown, faUser, faHeart, faUpload, faTimes, faEdit, faBars } from '@fortawesome/free-solid-svg-icons';

import { AuthUserContext } from '../context/context.js';
import { auth } from "../services/firebase.js";
import ErrorBoundary from '../ErrorBoundary.js';

import ROUTES from '../constants/routes.js';
import { Header } from './header.js';
import Topmenu from './topmenu.js';
import Footer from './footer.js';
import Home from './home.js';
import Login from './login.js';
import Register from './register.js';
import Profile from './profile.js';
import Create from './create.js';
import Edit from './edit.js';
import Details from './details.js';
import MyItems from './myItems.js';
import Favorites from './favorites.js';
import ListPage from './listPage.js';
import SearchPage from './searchPage.js';
import NotFound from './notFound.js';
import Error from './errorPage.js';
import Loader from './loader.js';

library.add(faChevronDown, faUser, faHeart, faUpload, faTimes, faEdit, faBars);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
      isLoading: true
    };

    this.timer = setTimeout(this.setLoading, 400);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  setLoading = () => {
    this.setState({ isLoading: false });
  }
  

  componentDidMount() {
    auth.onAuthStateChanged(authUser => {
      this.setState({ authUser });
    })
  }

  render() {
    if(this.state.isLoading) {
      return <Loader/>
    }

    return (
      <ErrorBoundary>
        <AuthUserContext.Provider value={this.state.authUser}>
          <BrowserRouter>
            <Header />
            <Topmenu />

            <Switch>
              <Route exact path={ROUTES.HOME} component={Home} />

              <Route path={ROUTES.LOGIN} >
                {this.state.authUser ? (<Redirect to={ROUTES.PROFILE} />) : (<Login />)}
              </Route>

              <Route path={ROUTES.REGISTER} >
                {this.state.authUser ? (<Redirect to={ROUTES.PROFILE} />) : (<Register />)}
              </Route>

              <Route path={ROUTES.PROFILE} component={Profile} />
              <Route path={ROUTES.CREATE} component={Create} />
              <Route path={`${ROUTES.EDIT}/:id`} component={Edit} />
              <Route path={`${ROUTES.DETAILS}/:id`} component={Details} />
              <Route path={ROUTES.MY_RECIPES} component={MyItems} />
              <Route path={ROUTES.FAVORITES_RECIPES} component={Favorites} />
              <Route path={`${ROUTES.RECIPES}/:categoryName`} component={ListPage} />
              <Route path={ROUTES.SEARCH} component={SearchPage} />
              <Route path={ROUTES.ERROR} component={Error} />
              <Route path="" component={NotFound} />
            </Switch>

            <Footer />
          </BrowserRouter>
        </AuthUserContext.Provider>
      </ErrorBoundary>

    );
  }
}

export default App;
