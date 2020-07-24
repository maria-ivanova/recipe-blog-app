import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { loginUser } from '../helpers/userAuth.js';
import { customErrors } from '../constants/errors.js';
import ROUTES from '../constants/routes.js';

import { PageTitleContext } from '../context/context.js';

import PageTitle from './pageTitle.js';
import mainStyles from '../styles/app.module.css';
import styles from '../styles/login.module.css';

const INITIAL_STATE = {
    email: '',
    password: '',
    errorMsg: null
}

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {...INITIAL_STATE};
    }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitHandler = (event) => {
        event.preventDefault();
        const { email, password} = this.state;

        loginUser(email, password)
        .then(response => {
            this.setState({...INITIAL_STATE});
            this.props.history.push(ROUTES.PROFILE);
        })
        .catch(error => {
            this.setState({
                errorMsg: customErrors['wrongUserPassword'] || error.message
            })
        })
    }

    render() {
        const {email, password, errorMsg } = this.state;

        return (
            <section className={`${mainStyles.sec} ${mainStyles.content_sec}`}>
                <div className={`${mainStyles.container} ${mainStyles.tcenter}`}>

                    <PageTitleContext.Provider value="Вход">
                        <PageTitle />
                    </PageTitleContext.Provider>

                    <form onSubmit={this.submitHandler} className={styles.user_form}>
                        {errorMsg ? <div className={mainStyles.errorMsg}>{errorMsg}</div> : null}

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
                            <button type="submit" className={mainStyles.btn}>
                                Влез
                            </button>
                        </div>

                        <div className={mainStyles.input_row}>
                            Все още нямаш профил? <Link to={ROUTES.REGISTER}>Регистрирай се</Link>
                        </div>
                    </form>
                </div>
            </section>
        )
    }
}

export default Login;