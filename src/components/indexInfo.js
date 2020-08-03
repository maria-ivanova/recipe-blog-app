import React from 'react';
import PageTitle from './pageTitle.js';

import mainStyles from '../styles/app.module.css';
import styles from '../styles/indexInfo.module.css';

import SoupImg from '../images/i_soup.svg';
import MainDishImg from '../images/i_mainDish.svg';
import DessertImg from '../images/i_dessert.svg';

const IndexInfo = () => {
    return (
        <section className={`${mainStyles.sec} ${mainStyles.content_sec} ${styles.bg_sec}`}>
				<div className={mainStyles.container}>
                    <PageTitle />

					<div className={styles.inner_txt}>
						На нашия уебсайт можете да намерите селекции от рецепти, групирани по категории, <br />
                        написани от хиляди кулинари от всички краища на страната!
					</div>

					<div className={styles.cells_box}>
						<span className={styles.cell}>
							<img src={SoupImg} alt="soup"/>
							<span className={styles.title}>Салати</span>
						</span>

						<span className={styles.cell}>
							<img src={MainDishImg} alt="dish"/>
							<span className={styles.title}>Основни ястия</span>
						</span>

						<span className={styles.cell}>
							<img src={SoupImg} alt="soup"/>
							<span className={styles.title}>Супи</span>
						</span>

						<span className={styles.cell}>
							<img src={DessertImg} alt="dessert"/>
							<span className={styles.title}>Десерти</span>
						</span>
					</div>
				</div>
			</section>
    )
}

export default IndexInfo;