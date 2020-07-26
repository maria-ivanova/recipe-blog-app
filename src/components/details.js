import React, { Component, Fragment } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import iconBook from '../images/i_book.svg';
import iconAlarm from '../images/i_alarm.svg';
import iconDish from '../images/i_dish.svg';

import mainStyles from '../styles/app.module.css';
import styles from '../styles/details.module.css';

class Details extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Fragment>
                <section className={mainStyles.sec}>
                    <div className={styles.banner_item}>
                        <h2 className={styles.title}>Моите рецепти</h2>
                    </div>
                </section>

                <section className={`${mainStyles.sec} ${mainStyles.content_sec}`}>
                    <div className={mainStyles.container}>
                    <div className={styles.item_layout}>
						<div className={styles.left_part}>
							<div className={styles.img_box}>
								<img src="img/2.jpg" />
							</div>

							<div className={styles.features}>
								<div className={styles.features_item}>
									<span className={styles.icon}>
										<img src={iconBook} />
									</span>

									<div className={styles.info}>
										<span className={styles.title}>Категория</span><br />
										<span>Салати</span>
									</div>
								</div>

								<div className={styles.features_item}>
									<span className={styles.icon}>
										<img src={iconAlarm} />
									</span>

									<div className={styles.info}>
										<span className={styles.title}>Време за приготвяне</span><br />
										<span>30 мин.</span>
									</div>
								</div>

								<div className={styles.features_item}>
									<span className={styles.icon}>
										<img src={iconDish} />
									</span>

									<div className={styles.info}>
										<span className={styles.title}>Порции</span><br />
										<span>2</span>
									</div>
								</div>
							</div>
						</div>

						<div className={styles.right_part}>
							<h2 className={styles.page_title}>
								Макаронена салата с пиле и авокадо
							</h2>

							<h3 className={styles.inner_title}>Необходими съставки:</h3>
							<div className={mainStyles.row}>
									макарони 200 грама <br />
									домати 200 грама <br />
									авокадо 1 брой<br />
									пилешко месо 200 грама<br />
									пресен лук 3 броя<br />
									зехтин 3 супени лъжици<br />
									балсамов оцет 1 супена лъжица<br />
							</div>
						</div>

						<div className={styles.description}>
							<h3 className={styles.inner_title}>Начин на приготвяне:</h3>
							<div className={mainStyles.row}>
								<p>
									Салатите с макарони вече не са изненада за българската трапеза, но сме свикнали най-често макаронените салати да са с майонеза като дресинг. Макаронената салата с пиле и авокадо е салата в различен стил. Макар, подобно на всяка макаронена салата и салатата с макарони, пиле и авокадо да е също много засищаща, тя е много по-свежа и лека. Тази салата е вкусно предложение, което реално може да замени всяко едно от основните хранения и да направи дневното ви меню по-разнообразно. Освен това, макаронената салата с пиле и авокадо дава идея и за един по-лек начин да хапнем паста, като забравим класическите сосове за спагети и макарони. 
								</p>

								<p>
									Първата стъпка от рецептата за макаронена салата с пиле и авокадо е подготовката на пилето и макароните. Макароните сварявате след като ги изсипете във вряща подсолена вода и варите според указаното на пакета. Отцеждате ги от водата, заливате със студена вода и отново отцеждата, след което ги изсипвате в купа, добавяте малко зехтин и разбърквате, за да не се слепнат. Докато варите и подготвяте макароните, сварявате и пилешкото месо. Може да ползвате всякакво пилешко месо - бяло месо, бутчета. След като месото те свари много добре го накъсвате на ситно и го добавяте към макароните.
								</p>

								<p>
									Измивате лука и доматите и ги нарязвате на дребно. Авокадото също нарязвате на кубчета и ги добавяте в купата към макароните. Добавяте около ½ чаена лъжица сол както и предвиденото количество зехтин и балсамов оцет и разбърквате добре с лъжица, така че салатата да се овкуси добре.
								</p>
							</div>
						</div>

						<div className={styles.item_meta}>
							<div className={mainStyles.fleft}>
								Публикувано от <span>admin</span> на <span>01 Юли 2020</span>
							</div>

							<a href="" className={`${mainStyles.btn} ${styles.btn}`}>
                                <FontAwesomeIcon icon="heart" className={styles.fa} />  
                                Добави в любими
                            </a>
						</div>
					</div>
                    </div>
                </section>
            </Fragment>
        )
    }
}

export default Details;