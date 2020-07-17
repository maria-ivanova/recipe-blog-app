import React from 'react';

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

                <a href="" className={`${mainStyles.btn} ${styles.btn}`}>Всички рецепти</a>
            </div>
        </section>
    )
}

export default IndexBanner;