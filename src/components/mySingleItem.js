import React from 'react';
import ROUTES from '../constants/routes.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import mainStyles from '../styles/app.module.css';
import styles from '../styles/mySingleItem.module.css';

const MySingleItem = (props) => {
    return (
        <div className={styles.item}>
            <a href="" className={styles.item_img}>
                <img src={props.value.imageUrl} />
            </a>

            <div className={styles.item_details}>
                <a href="" className={styles.title}>
                    {props.value.title}
                </a>

                <div className={styles.date}>
                    {new Intl.DateTimeFormat('bg-BG',
                        { year: 'numeric', month: 'long', day: '2-digit' }).format(props.value.createdDate)
                    }
                </div>

                <div className={styles.short_content}>
                    {props.value.recipeDescription.substr(0, 50)}...
				</div>

                <div className={styles.item_meta}>
                    <span className={styles.cell}>
                        <FontAwesomeIcon icon="user" className={styles.fa} />
                        <span>{props.value.creatorName}</span>
                    </span>

                    <span className={styles.cell}>
                        <FontAwesomeIcon icon="heart" className={styles.fa} />
                        <span>{props.value.likes}</span>
                    </span>
                </div>

                <div className={styles.btns_box}>
                    <a href="" className={`${mainStyles.btn} ${styles.btn}`}>
                        Редактирай
                        </a>

                    <button onClick={props.deleteHandler}
                        className={`${mainStyles.btn} ${styles.btn} ${styles.btn_del}`}>
                        Изтрий
                    </button>
                </div>
            </div>
        </div>
    )
}



export default MySingleItem;
