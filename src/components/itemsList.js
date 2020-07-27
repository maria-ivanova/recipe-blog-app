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
        let { data } = this.state;
        const { sortCriterion, filerCriterion, secondFilterCriterion, hiddenPageTitle, maxElements } = this.props;

        if (filerCriterion && secondFilterCriterion !== 'Всички рецепти') {
            data = data.filter(el => el[filerCriterion] === secondFilterCriterion);
            console.log('dsdsd')
        }

        if (sortCriterion) {
            data = data.sort((a, b) => b[sortCriterion] - a[sortCriterion])
        }

        if (maxElements) {
            data = data.slice(0, maxElements + 1);
        }

        return (
            <section className={`${mainStyles.sec} ${mainStyles.content_sec}`}>
                <div className={mainStyles.container}>
                    {hiddenPageTitle ? null : <PageTitle />}

                    <div className={styles.items_list}>
                        {data.map(el => <SingleItem key={el.id} value={el} />)}
                    </div>
                </div>
            </section>
        )
    }
}

export default ItemsList;