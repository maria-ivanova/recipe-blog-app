import React, { Component } from 'react';
import { registerUser } from '../helpers/userAuth.js';
import { firebaseErrors, customErrors } from '../constants/errors.js';
import ROUTES from '../constants/routes.js';

import PageTitle from './pageTitle.js';
import { PageTitleContext } from '../context/context.js';

import mainStyles from '../styles/app.module.css';
import styles from '../styles/register.module.css';

const INITIAL_STATE = {
    username: '',
    email: '',
    password: '',
    rePassword: '',
    errorMsg: null
}

class Register extends Component {
    constructor(props) {
        super(props)

        this.state = { ...INITIAL_STATE };
    }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitHandler = (event) => {
        event.preventDefault();
        const { email, username, password, rePassword } = this.state;

        if(email === '' || username === '' || password === '' || rePassword === '') {
            this.setState({
                errorMsg: customErrors['requiredFields']
            })
            return;
        }

        if (!email.includes('@')) {
            this.setState({
                errorMsg: customErrors['invalidEmail']
            })
            return;
        }

        if (password !== rePassword) {
            this.setState({
                errorMsg: customErrors['badPassword']
            })
            return;
        }

        registerUser(email, password)
            .then((response) => {
                if (response) {
                    response.user.updateProfile({
                        displayName: username
                    })
                }
            })
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({
                    errorMsg: firebaseErrors[error.code] || customErrors['failedRegister']
                })
            })
    }

    render() {
        const { username, email, password, rePassword, errorMsg } = this.state;

        return (
            <section className={`${mainStyles.sec} ${mainStyles.content_sec}`}>
                <div className={`${mainStyles.container} ${mainStyles.tcenter}`}>

                    <PageTitleContext.Provider value="Регистрация">
                        <PageTitle />
                    </PageTitleContext.Provider>

                    <form onSubmit={this.submitHandler} className={styles.user_form}>
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
                                required />
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
                                required />
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
                                Регистрирай се
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        )
    }
}

export default Register;