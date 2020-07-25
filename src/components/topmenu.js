import React, { Component } from 'react';
import { getCategories } from '../helpers/firebaseRequests.js';

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
						<a href="" className={styles.current}>Начало</a>
						{this.allCategories.map(el => <a href="" key={el}>{el}</a>)}
						<a href="">За нас</a>
					</nav>
				</div>
			</section>
		)
	}
}

export default Topmenu;