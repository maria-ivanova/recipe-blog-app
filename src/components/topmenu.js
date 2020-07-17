import React from 'react';

import mainStyles from '../styles/app.module.css';
import styles from '../styles/topmenu.module.css';

const Topmenu = () => {
    return (
        <section className={`${mainStyles.sec} ${styles.nav_sec}`}>
			<div className={`${mainStyles.container}`}>
				<nav className={styles.topmenu}>
					<a href="" className={styles.current}>Начало</a>
					<a href="">Салати</a>
					<a href="">Супи</a>
					<a href="">Основни ястия</a>
					<a href="">Десерти</a>
					<a href="">За нас</a>
				</nav>
			</div>
		</section>
    )
}

export default Topmenu;