import React, { Component } from 'react';
import PageTitle from './pageTitle.js';
import SingleItem from './singleItem.js';

import mainStyles from '../styles/app.module.css';
import styles from '../styles/itemsList.module.css';

class ItemsList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <section className={`${mainStyles.sec} ${mainStyles.content_sec}`}>
                <div className={mainStyles.container}>
                    <PageTitle />
                    
                    <div className={styles.items_list}>
                        <SingleItem />
                        <SingleItem />
                        <SingleItem />
                        <SingleItem />
                        <SingleItem />
                        <SingleItem />
                        <SingleItem />
                        <SingleItem />
                    </div>
                </div>
            </section>
        )
    }
}

export default ItemsList;