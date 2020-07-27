import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { logout } from '../helpers/userAuth.js';
import { AuthUserContext } from '../context/context.js';

import ROUTES from '../constants/routes.js';
import Logo from './logo.js';
import SearchForm from './searchForm.js';

import mainStyles from '../styles/app.module.css';
import styles from '../styles/header.module.css';

class Header extends Component {
	static contextType = AuthUserContext;

	render() {
		return (
			<header className={`${mainStyles.sec} ${styles.header_sec}`}>
				<div className={`${mainStyles.container} ${styles.container}`}>
					<Logo />
					<SearchForm />

					<div className={styles.header_right}>
						{this.context ?

							<ul className={styles.menu}>
								<li>
									<a>{this.context.email} <FontAwesomeIcon icon="chevron-down" className={styles.fa} /></a>
									<ul className={styles.submenu}>
										<li>
											<Link to={ROUTES.CREATE}>Създай рецепта</Link>
										</li>

										<li>
											<Link to={ROUTES.MY_RECIPES}>Моите рецепти</Link>
										</li>

										<li>
											<Link to={ROUTES.FAVORITES_RECIPES}>Любими рецепти</Link>
										</li>


										<li>
											<Link to={ROUTES.PROFILE}>Профил</Link>
										</li>
									</ul>
								</li>

								<li>
									<Link to={ROUTES.LOGIN} onClick={logout}>Изход</Link>
								</li>
							</ul>
							:
							<ul className={styles.menu}>
								<li>
									<Link to={ROUTES.LOGIN}>Вход</Link>
								</li>

								<li>
									<Link to={ROUTES.REGISTER}>Регистрация</Link>
								</li>
							</ul>
						}
					</div>
				</div>
			</header>
		)
	}



}

export default Header