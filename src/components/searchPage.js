import React from 'react';
import PageTitle from './pageTitle.js';
import SingleItem from './singleItem.js';
import { PageTitleContext } from '../context/context.js';

import mainStyles from '../styles/app.module.css';
import styles from '../styles/searchPage.module.css';

const SearchPage = (props) => {
    let data = [];

    if (props.location.state) {
        data = props.location.state.searchItems
    }
    
    return (
        <PageTitleContext.Provider value="Резултат от търсенето">
            <section className={`${mainStyles.sec} ${mainStyles.content_sec}`}>
                <div className={mainStyles.container}>
                    <PageTitle />

                    <div className={styles.items_list}>
                        {data.map(el => <SingleItem key={el.id} value={el} />)}
                    </div>
                </div>
            </section>
        </PageTitleContext.Provider>
    )
}

export default SearchPage;