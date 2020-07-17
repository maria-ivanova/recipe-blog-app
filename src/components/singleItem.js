import React from 'react';
import styles from '../styles/singleItem.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import itemImg from '../images/1.jpg';

const SingleItem = () => {
    return (
        <div className={styles.item}>
            <a href="" className={styles.item_img}>
                <img src={itemImg} />
            </a>

            <div className={styles.item_details}>
                <a href="" className={styles.title}>
                    Ризото с тиква
				</a>

                <div className={styles.date}>
                    01 Юли 2020
				</div>

                <div className={styles.short_content}>
                    Не само уникално апетитно на вид, но и истински вкусно!...
				</div>

                <div className={styles.item_meta}>
                    <span className={styles.cell}>
                        <FontAwesomeIcon icon="user" className={styles.fa}/>
                        <span>admin</span>
                    </span>

                    <span className={styles.cell}>
                        <FontAwesomeIcon icon="heart" className={styles.fa}/>
                        <span>0</span>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default SingleItem;

