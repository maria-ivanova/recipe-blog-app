import React from 'react';
import { Link } from 'react-router-dom';
import ROUTES from '../constants/routes.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from '../styles/singleItem.module.css';



const SingleItem = (props) => {
    return (
        <div className={styles.item}>
            <Link to={`${ROUTES.DETAILS}/${props.value.id}`}
                className={styles.item_img}>

                <img src={props.value.imageUrl} />
            </Link>

            <div className={styles.item_details}>
                <Link to={`${ROUTES.DETAILS}/${props.value.id}`}
                    className={styles.title}>

                    {props.value.title}
                </Link>


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
            </div>
        </div>
    )
}

export default SingleItem;

