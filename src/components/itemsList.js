import React, { Component } from 'react';
import { getData } from '../helpers/firebaseRequests.js';
import PageTitle from './pageTitle.js';
import SingleItem from './singleItem.js';

import mainStyles from '../styles/app.module.css';
import styles from '../styles/itemsList.module.css';

class ItemsList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: []
        }
    }

    updateData = async () => {
        const data = await getData();
        let dataArr = [];

        if (data) {
            dataArr = Object.keys(data).map(key => {
                return {
                    id: key,
                    ...data[key]
                }
            })
        }

        await this.setState({ data: dataArr });
    }

    componentDidMount() {
        this.updateData();
    }

    render() {
        const { data } = this.state;
        const sortCriterion = this.props.sortCriterion;

        return (
            <section className={`${mainStyles.sec} ${mainStyles.content_sec}`}>
                <div className={mainStyles.container}>
                    <PageTitle />

                    <div className={styles.items_list}>
                        {data.sort((a, b) => b[sortCriterion] - a[sortCriterion] )
                             .slice(0, 9)
                             .map(el => <SingleItem key={el.id} value={el} />)}
                    </div>
                </div>
            </section>
        )
    }
}

export default ItemsList;