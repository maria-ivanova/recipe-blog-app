import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { logout } from '../helpers/userAuth.js';
import { AuthUserContext } from '../context/context.js';

import ROUTES from '../constants/routes.js';
import Logo from './logo.js';
import SearchForm from './searchForm.js';
import MobileMenu from './mobileMenu.js';

import mainStyles from '../styles/app.module.css';
import styles from '../styles/header.module.css';

const authUserLinks = [
	<li key='logout'>
		<Link to={ROUTES.LOGIN} onClick={logout}>Изход</Link>
	</li>
]
const authUserSubLinks = [
	<li key='create'>
		<Link to={ROUTES.CREATE}>Създай рецепта</Link>
	</li>,

	<li key='myRecipes'>
		<Link to={ROUTES.MY_RECIPES}>Моите рецепти</Link>
	</li>,

	<li key='favoritesRecipes'>
		<Link to={ROUTES.FAVORITES_RECIPES}>Любими рецепти</Link>
	</li>,

	<li key='profil'>
		<Link to={ROUTES.PROFILE}>Профил</Link>
	</li>
];

const unauthUserLinks = [
	<li key='login'>
		<Link to={ROUTES.LOGIN}>Вход</Link>
	</li>,

	<li key='register'>
		<Link to={ROUTES.REGISTER}>Регистрация</Link>
	</li>
];

class Header extends Component {
	static contextType = AuthUserContext;

	render() {
		return (
			<header className={`${mainStyles.sec} ${styles.header_sec}`}>
				<div className={`${mainStyles.container} ${styles.container}`}>
					<Logo />
					<SearchForm />
					<MobileMenu />

					<div className={styles.header_right}>
						{this.context ?

							<ul className={styles.menu}>
								<li>
									<span>{this.context.email} <FontAwesomeIcon icon="chevron-down" className={styles.fa} /></span>
									<ul className={styles.submenu}>
										{authUserSubLinks}
									</ul>
								</li>

								{authUserLinks}
							</ul>
							:
							<ul className={styles.menu}>
								{unauthUserLinks}
							</ul>
						}
					</div>
				</div>
			</header>
		)
	}
}

export { authUserLinks, authUserSubLinks };
export { unauthUserLinks };
export { Header };