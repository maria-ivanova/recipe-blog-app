import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../helpers/firebaseRequests.js';
import ROUTES from '../constants/routes.js';

import mainStyles from '../styles/app.module.css';
import styles from '../styles/topmenu.module.css';

class Topmenu extends Component {
	constructor(props) {
		super(props);

		this.state = {
			links: []
		}
	}

	getAllCategories = async () => {
		const allCategories = Object.values(await getCategories())[0];

		this.setState({
			links: allCategories
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
						<Link to={ROUTES.HOME} key='home'>
							Начало
						</Link>
						{this.state.links.map(el => 
							<Link to={`${ROUTES.RECIPES}/${el}`} key={el}>
								{el}
							</Link>)}
					</nav>
				</div>
			</section>
		)
	}
}

export default Topmenu;