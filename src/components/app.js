import React, { Fragment } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronDown, faUser, faHeart } from '@fortawesome/free-solid-svg-icons';

import ROUTES from '../constants/routes.js';
import Header from './header.js';
import Topmenu from './topmenu.js';
import Footer from './footer.js';
import Home from './home.js';
import Login from './login.js';
import Register from './register.js';

library.add(faChevronDown, faUser, faHeart)

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Topmenu />

      <Route exact path={ROUTES.HOME}  component={Home}/>
      <Route path={ROUTES.LOGIN}  component={Login}/>
      <Route path={ROUTES.REGISTER}  component={Register}/>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
