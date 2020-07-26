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
        const { sortCriterion, filerCriterion, secondFilterCriterion, hiddenPageTitle } = this.props;

        return (
            <section className={`${mainStyles.sec} ${mainStyles.content_sec}`}>
                <div className={mainStyles.container}>
                    {hiddenPageTitle ? null : <PageTitle />}

                    <div className={styles.items_list}>
                        {filerCriterion ?
                            secondFilterCriterion === 'Всички рецепти' ?

                                data.map(el => <SingleItem key={el.id} value={el} />)

                                :

                                data.filter(el => el[filerCriterion] === secondFilterCriterion)
                                    .map(el => <SingleItem key={el.id} value={el} />)

                            :

                            data.sort((a, b) => b[sortCriterion] - a[sortCriterion])
                                .slice(0, 9)
                                .map(el => <SingleItem key={el.id} value={el} />)
                        }
                    </div>
                </div>
            </section>
        )
    }
}

export default ItemsList;