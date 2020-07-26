import React, { Fragment } from 'react';
import ItemsList from './itemsList.js';

import mainStyles from '../styles/app.module.css';
import styles from '../styles/listPage.module.css';

const ListPage = (props) => {
    const categoryName = props.match.params.categoryName;

    return (
        <Fragment>
            <section className={mainStyles.sec}>
                <div className={styles.banner_item}>
                    <h2 className={styles.title}>{categoryName}</h2>
                </div>
            </section>

            <ItemsList filerCriterion="category" 
                        secondFilterCriterion={categoryName}
                        hiddenPageTitle='yes'/>
        </Fragment>

    )
}

export default ListPage;