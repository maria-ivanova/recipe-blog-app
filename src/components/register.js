import React, { Component } from 'react';

import PageTitleContext from '../context/context.js'

import PageTitle from './pageTitle.js';
import mainStyles from '../styles/app.module.css';
import styles from '../styles/register.module.css';

class Register extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <section className={`${mainStyles.sec} ${mainStyles.content_sec}`}>
                <div className={`${mainStyles.container} ${mainStyles.tcenter}`}>

                    <PageTitleContext.Provider value="Регистрация">
                        <PageTitle />
                    </PageTitleContext.Provider>

                    <form action="" method="POST" className={styles.user_form}>
                        <div className={mainStyles.input_row}>
                            <label className={mainStyles.lbl}>
                                Потребителско име <span className={mainStyles.tred}>*</span>
                            </label>

                            <input type="text" name="username" className={`${mainStyles.input_text} ${styles.input_text}`} required />
                        </div>

                        <div className={mainStyles.input_row}>
                            <label className={mainStyles.lbl}>
                                Имейл <span className={mainStyles.tred}>*</span>
                            </label>

                            <input type="text" name="userMail" className={`${mainStyles.input_text} ${styles.input_text}`} required />
                        </div>

                        <div className={mainStyles.input_row}>
                            <label className={mainStyles.lbl}>
                                Парола <span className={mainStyles.tred}>*</span>
                            </label>

                            <input type="password" name="password" className={`${mainStyles.input_text} ${styles.input_text}`} required />
                        </div>

                        <div className={mainStyles.input_row}>
                            <label className={mainStyles.lbl}>
                                Повтори паролата <span className={mainStyles.tred}>*</span>
                            </label>

                            <input type="password" name="rePassword" className={`${mainStyles.input_text} ${styles.input_text}`} required />
                        </div>

                        <div class="input_row">
                            <button type="submit" value="login" className={mainStyles.btn}>
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