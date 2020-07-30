import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { getCategories } from '../helpers/firebaseRequests.js';
import ROUTES from '../constants/routes.js';

import mainStyles from '../styles/app.module.css';
import styles from '../styles/topmenu.module.css';

class Topmenu extends Component {
	constructor(props) {
		super(props);

		this.allCategories = [];
	}

	getAllCategories = async () => {
		this.allCategories = Object.values(await getCategories())[0];

		await this.setState({
			category: this.allCategories[0]
		})
	}

	componentDidMount() {
		this.getAllCategories();
	}

	render() {
		return (
			<section className={`${mainStyles.sec} ${styles.nav_sec}`}>
				<div className={`${mainStyles.container}`}>
					<nav className={styles.topmenu}>
						<NavLink to={ROUTES.HOME}>
							Начало
						</NavLink>
						{this.allCategories.map(el => 
							<NavLink to={`${ROUTES.RECIPES}/${el}`} key={el}>
								{el}
							</NavLink>)}
					</nav>
				</div>
			</section>
		)
	}
}

export default Topmenu;