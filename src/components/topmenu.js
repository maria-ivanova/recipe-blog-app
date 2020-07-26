import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
						<Link to={ROUTES.HOME}>Начало</Link>
						{this.allCategories.map(el => <Link to={`${ROUTES.RECIPES}/${el}`} key={el}>{el}</Link>)}
						<a href="">За нас</a>
					</nav>
				</div>
			</section>
		)
	}
}

export default Topmenu;