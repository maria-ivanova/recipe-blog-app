import React from 'react';
import { Link } from 'react-router-dom';
import ROUTES from '../constants/routes.js';

import mainStyles from '../styles/app.module.css';
import styles from '../styles/indexBanner.module.css';

const IndexBanner = () => {
    return (
        <section className={`${mainStyles.sec} ${styles.banner_sec}`}>
            <div className={styles.banner_item}>
                <h2 className={styles.title}>
                    Сготви бързо и лесно с <br />
                    <span>Spatulas.bg</span>
                </h2>

                <Link to={`${ROUTES.RECIPES}/Всички рецепти`}
                      className={`${mainStyles.btn} ${styles.btn}`}>
                    Всички рецепти
                </Link>
            </div>
        </section>
    )
}

export default IndexBanner;