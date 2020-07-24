import React, { Component } from 'react';
import { passwordUpdate } from '../helpers/userAuth.js';
import { firebaseErrors, customErrors } from '../constants/errors.js';
import { AuthUserContext } from '../context/context.js';
import WithAuthorization from './withAuthorization.js';
import ROUTES from '../constants/routes.js';

import PageTitle from './pageTitle.js';
import { PageTitleContext } from '../context/context.js';

import mainStyles from '../styles/app.module.css';
import styles from '../styles/profile.module.css';

let INITIAL_STATE = {
    username: '',
    email: '',
    password: '',
    rePassword: '',
    errorMsg: null
}

class Profile extends Component {
    static contextType = AuthUserContext;

    constructor(props) {
        super(props)

        this.state = { ...INITIAL_STATE };
    }

    componentDidMount() {
        const userContext = this.context;

        if (userContext) {
            this.setState({
                username: userContext.displayName,
                email: userContext.email,
                password: '',
                rePassword: '',
                errorMsg: null
            })
        }
    }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitHandler = (event) => {
        event.preventDefault();
        const { password, rePassword } = this.state;

        if (password !== rePassword) {
            this.setState({
                errorMsg: customErrors['badPassword']
            })
            return;
        }

        passwordUpdate(password)
            .then(response => {
                this.setState({
                    password: '',
                    rePassword: '',
                    errorMsg: null
                });
                this.props.history.push(ROUTES.PROFILE);
            })
            .catch(error => {
                this.setState({
                    errorMsg: firebaseErrors[error.code] || error.message
                })
            })
    }

    render() {
        const { username, email, password, rePassword, errorMsg } = this.state;

        return (
            <section className={`${mainStyles.sec} ${mainStyles.content_sec}`}>
                <div className={`${mainStyles.container} ${mainStyles.tcenter}`}>

                    <PageTitleContext.Provider value="Профил">
                        <PageTitle />
                    </PageTitleContext.Provider>

                    <form onSubmit={this.submitHandler} className={styles.profile_form}>
                        {errorMsg ? <div className={mainStyles.errorMsg}>{errorMsg}</div> : null}

                        <div className={mainStyles.input_row}>
                            <label className={mainStyles.lbl}>
                                Потребителско име <span className={mainStyles.tred}>*</span>
                            </label>

                            <input type="text"
                                name="username"
                                value={username}
                                onChange={this.changeHandler}
                                className={`${mainStyles.input_text} ${styles.input_text}`}
                                disabled />
                        </div>

                        <div className={mainStyles.input_row}>
                            <label className={mainStyles.lbl}>
                                Имейл <span className={mainStyles.tred}>*</span>
                            </label>

                            <input type="email"
                                name="email"
                                value={email}
                                onChange={this.changeHandler}
                                className={`${mainStyles.input_text} ${styles.input_text}`}
                                disabled />
                        </div>

                        <div className={mainStyles.input_row}>
                            <label className={mainStyles.lbl}>
                                Парола <span className={mainStyles.tred}>*</span>
                            </label>

                            <input type="password"
                                name="password"
                                value={password}
                                onChange={this.changeHandler}
                                className={`${mainStyles.input_text} ${styles.input_text}`}
                                required />
                        </div>

                        <div className={mainStyles.input_row}>
                            <label className={mainStyles.lbl}>
                                Повтори паролата <span className={mainStyles.tred}>*</span>
                            </label>

                            <input type="password"
                                name="rePassword"
                                value={rePassword}
                                onChange={this.changeHandler}
                                className={`${mainStyles.input_text} ${styles.input_text}`}
                                required />
                        </div>

                        <div className={mainStyles.input_row}>
                            <button type="submit" className={mainStyles.btn}>
                                Редактирай
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        )
    }
}

const condition = authUser => authUser != null;
export default WithAuthorization(condition, Profile);