import React, { Fragment } from 'react';
import Logo from './logo.js';

import mainStyles from '../styles/app.module.css';
import styles from '../styles/footer.module.css';

const Footer = () => {
    return (
        <Fragment>
            <footer className={`${mainStyles.sec} ${mainStyles.content_sec} ${styles.footer_sec}`}>
                <div className={`${mainStyles.container} ${styles.container}`}>
                    <Logo />
                    
                    <p>
                        Наслаждавай се на вкусната храна със съветите на Spatulas.bg.<br />
					    Готви с хиляди кулинари от всички краища на страната!
				    </p>

                    <p>
                        Свържете се с нас: <a href="mailto:spatulas@info.bg">spatulas@info.bg</a>
                    </p>

                </div>
            </footer>

            <section className={`${mainStyles.sec} ${styles.copyrights}`}>
                <div className={`${mainStyles.container} ${styles.container}`}>
                    <div className={`${mainStyles.ib} ${mainStyles.fleft}`}>
                        2020 Spatulas Всички права запазени
                    </div>

                    <div className={`${mainStyles.ib} ${mainStyles.fright}`}>
                        <a href="">Политика за поверителност</a>
                        <a href="">Политика за бисквитките</a>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default Footer;