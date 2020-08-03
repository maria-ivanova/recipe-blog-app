import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { getData, deleteItem } from '../helpers/firebaseRequests.js';
import ROUTES from '../constants/routes.js';

import SingleItem from './mySingleItem.js';

import Notifications, { notify } from './notifications.js';

import WithAuthorization from './withAuthorization.js';
import { AuthUserContext } from '../context/context.js';

import mainStyles from '../styles/app.module.css';
import styles from '../styles/myItems.module.css';

class MyItems extends Component {
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
            .filter(el => el['creatorId'] === this.context.uid)
            .sort((a, b) => b['createdDate'] - a['createdDate']);
        }

        await this.setState({ data: dataArr });
    }

    deleteItem = async (id, event) => {
        event.preventDefault();

        await deleteItem(id)
            .then(response => {
                notify('success', 'Рецептата беше успeшно изтрита!');
                this.updateData();
            })
            .catch(error => {
                notify('error', 'Неуспешно изтриване на рецепта!');
            })
    }

    componentDidMount() {
        this.updateData();
    }

    render() {
        const { data } = this.state;

        return (
            <Fragment>
                <Notifications />

                <section className={mainStyles.sec}>
                    <div className={styles.banner_item}>
                        <h2 className={styles.title}>Моите рецепти</h2>
                    </div>
                </section>

                <section className={`${mainStyles.sec} ${mainStyles.content_sec}`}>
                    <div className={mainStyles.container}>

                        <div className={`${styles.items_list} ${styles.my_list}`}>
                            {data.length !== 0 ?
                                data.map(el => <SingleItem key={el.id}
                                    value={el}
                                    deleteHandler={this.deleteItem.bind(this, el.id)} />)

                                :

                                <div className={styles.inner_text}>
                                    <h3>
                                        Все още нямате създадени рецепти!
                                    </h3>

                                    <Link to={ROUTES.CREATE}
                                        className={`${mainStyles.btn} ${styles.btn}`}>
                                        Създай рецепта
                                    </Link>
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
export default WithAuthorization(condition, MyItems);