import React from 'react';
import ROUTES from '../constants/routes.js';
import { auth } from "../services/firebase.js";
import { AuthUserContext } from '../context/context.js';

const withAuthorization = (condition, Component) => {
    class WithAuthorization extends React.Component {

        componentDidMount() {
            auth.onAuthStateChanged(authUser => {
                if (!condition(authUser)) {
                    this.props.history.push(ROUTES.LOGIN);
                }
            },
            );
        }

        render() {
            return (
                <AuthUserContext.Consumer>
                    {authUser =>
                        condition(authUser) ? <Component {...this.props} /> : null
                    }
                </AuthUserContext.Consumer>
            );
        }
    }

    return WithAuthorization;
};

export default withAuthorization;