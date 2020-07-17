import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ROUTES from '../constants/routes.js';
import Logo from './logo.js';
import SearchForm from './searchForm.js';

import mainStyles from '../styles/app.module.css';
import styles from '../styles/header.module.css';

const Header = () => {
    return (
        <header className={`${mainStyles.sec} ${styles.header_sec}`}>
			<div className={`${mainStyles.container} ${styles.container}`}>
				<Logo />
				<SearchForm />

				<div className={styles.header_right}>
					<ul className={styles.menu}>
						<li>
							<Link to={ROUTES.LOGIN}>Вход</Link>
						</li>

						<li>
							<Link to={ROUTES.REGISTER}>Регистрация</Link>
						</li>
					</ul> 
					
					<ul className={styles.menu}>
						<li>
							<a href="javascript:void(0)">Моят профил <FontAwesomeIcon icon="chevron-down" className={styles.fa}/></a>
							<ul className={styles.submenu}>
								<li><a href="">Създай рецепта</a></li>

								<li><a href="">Моите рецепти</a></li>

								<li><a href="">Профил</a></li>
							</ul>
						</li>

						<li><a href="">Изход</a></li>
					</ul>
				</div>
			</div>
		</header>
    )
}

export default Header