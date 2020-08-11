import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { AuthUserContext } from '../../context/context.js';

const Routing = (props) => {
    return (
        <BrowserRouter>
            <Route>
                <AuthUserContext.Provider value={props.value}>
                    {props.children}
                </AuthUserContext.Provider>
            </Route>
        </BrowserRouter>
    )
}

export default Routing;