import React, { Component, Fragment } from 'react';
import { getData } from '../helpers/firebaseRequests.js';

import SingleItem from './singleItem.js';

import WithAuthorization from './withAuthorization.js';
import { AuthUserContext } from '../context/context.js';

import mainStyles from '../styles/app.module.css';
import styles from '../styles/favorites.module.css';

class Favorites extends Component {
    static contextType = AuthUserContext;

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
            .filter(el => el.likes !== 0)
            .filter(el => el['likesArr'].includes(this.context.uid));
        }

        await this.setState({ data: dataArr });
    }

    componentDidMount() {
        this.updateData();
    }

    render() {
        const { data } = this.state;

        return (
            <Fragment>
                <section className={mainStyles.sec}>
                    <div className={styles.banner_item}>
                        <h2 className={styles.title}>Любими рецепти</h2>
                    </div>
                </section>

                <section className={`${mainStyles.sec} ${mainStyles.content_sec}`}>
                    <div className={mainStyles.container}>

                        <div className={`${styles.items_list} ${styles.my_list}`}>
                            {data.length !== 0 ?
                                data.map(el => <SingleItem key={el.id} value={el} />)

                                :

                                <div className={styles.inner_text}>
                                    <h3>
                                        Все още нямате любими рецепти!
                                    </h3>
                                </div>
                            }
                        </div>
                    </div>
                </section>
            </Fragment >

        )
    }

}

const condition = authUser => authUser != null;
export default WithAuthorization(condition, Favorites);