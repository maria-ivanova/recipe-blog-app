import React, { Component, Fragment } from 'react';
import { getItemInfo, postEdit } from '../helpers/firebaseRequests.js';
import { AuthUserContext } from '../context/context.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import iconBook from '../images/i_book.svg';
import iconAlarm from '../images/i_alarm.svg';
import iconDish from '../images/i_dish.svg';

import mainStyles from '../styles/app.module.css';
import styles from '../styles/details.module.css';

class Details extends Component {
	static contextType = AuthUserContext;

	constructor(props) {
		super(props)

		this.state = {
			creatorId: '',
			creatorName: '',
			createdDate: '',
			title: '',
			category: '',
			totalTime: '',
			yields: '',
			image: null,
			imageUrl: '',
			ingredients: '',
			recipeDescription: '',
			likes: 0,
			likesArr: [],
		}
	}

	getInfo = async (id) => {
		await getItemInfo(id)
			.then(response => response.json())
			.then(data => {
				this.setState({ ...data });
			})
			.catch(error => console.log(error));
	};

	likesHendler = async () => {
		const itemId = this.props.match.params.id;
		const userID = this.context.uid;

		const likes = await this.state.likes + 1;
		const likesArr = await this.state.likesArr;
		await likesArr.push(userID);

		await this.setState({
			likes,
			likesArr
		});

		const data = this.state;

		postEdit(itemId, data)
			.then(response => {
				console.log('successful like');
			})
			.catch(error => {
				console.log(error);
			})
	}

	isHidden = (userID) => {
		if (this.state.likesArr.includes(userID)) {
			return true;
		}

		if (this.state.creatorId === userID) {
			return true;
		}
	}


	componentDidMount() {
		const id = this.props.match.params.id;
		this.getInfo(id);
	}

	render() {
		const {
			creatorId,
			creatorName,
			createdDate,
			title,
			category,
			totalTime,
			yields,
			imageUrl,
			ingredients,
			recipeDescription,
			likes,
			likesArr,
		} = this.state;

		return (
			<Fragment>
				<section className={mainStyles.sec}>
					<div className={styles.banner_item}>
						<h2 className={styles.title}>{category}</h2>
					</div>
				</section>

				<section className={`${mainStyles.sec} ${mainStyles.content_sec}`}>
					<div className={mainStyles.container}>
						<div className={styles.item_layout}>
							<div className={styles.left_part}>
								<div className={styles.img_box}>
									<img src={imageUrl} />
								</div>

								<div className={styles.features}>
									<div className={styles.features_item}>
										<span className={styles.icon}>
											<img src={iconBook} />
										</span>

										<div className={styles.info}>
											<span className={styles.title}>Категория</span><br />
											<span>{category}</span>
										</div>
									</div>

									<div className={styles.features_item}>
										<span className={styles.icon}>
											<img src={iconAlarm} />
										</span>

										<div className={styles.info}>
											<span className={styles.title}>Време за приготвяне</span><br />
											<span>{totalTime}</span>
										</div>
									</div>

									<div className={styles.features_item}>
										<span className={styles.icon}>
											<img src={iconDish} />
										</span>

										<div className={styles.info}>
											<span className={styles.title}>Порции</span><br />
											<span>{yields}</span>
										</div>
									</div>
								</div>
							</div>

							<div className={styles.right_part}>
								<h2 className={styles.page_title}>
									{title}
								</h2>

								<h3 className={styles.inner_title}>Необходими съставки:</h3>
								<div className={mainStyles.row}>
									{ingredients}
								</div>
							</div>

							<div className={styles.description}>
								<h3 className={styles.inner_title}>Начин на приготвяне:</h3>
								<div className={mainStyles.row}>
									{recipeDescription}
								</div>
							</div>

							<div className={styles.item_meta}>
								<div className={mainStyles.fleft}>
									Публикувано от <span>{creatorName}</span> на &nbsp;
									<span>
										{new Intl.DateTimeFormat('bg-BG',
											{ year: 'numeric', month: 'long', day: '2-digit' }).format(createdDate)
										}
									</span>
								</div>

								{this.context ?
									this.isHidden(this.context.uid) ?
										<span className={styles.favorites_info}>
											<FontAwesomeIcon icon="heart" className={styles.fa} /> Добавена в любими
										</span>

										:

										<button onClick={this.likesHendler} className={`${mainStyles.btn} ${styles.btn}`}>
											<FontAwesomeIcon icon="heart" className={styles.fa} />
										Добави в любими
									</button>

									:

									null
								}
							</div>
						</div>
					</div>
				</section>
			</Fragment>
		)
	}
}

export default Details;