import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { authUserLinks, authUserSubLinks, unauthUserLinks } from './header.js';
import { getCategories } from '../helpers/firebaseRequests.js';
import { AuthUserContext } from '../context/context.js';
import ROUTES from '../constants/routes.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../styles/mobileMenu.module.css';

class MobileMenu extends Component {
    static contextType = AuthUserContext;

    constructor(props) {
        super(props);

        this.state = {
            links: [],
            isOpen: false
        }
    }

    getAllCategories = async () => {
        const allCategories = Object.values(await getCategories())[0];

        this.setState({
            links: allCategories
        })
    }

    componentDidMount() {
        this.getAllCategories();
    }

    setOpen = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        return (
            <Fragment>
                <button onClick={this.setOpen} className={styles.btn_mobile_menu}>
                    <FontAwesomeIcon icon="bars" />
                </button>

                <div className={`${styles.mobile_menu} ${this.state.isOpen ? styles.open : null}`}>
                    <button onClick={this.setOpen} className={styles.close_mobile_menu}>
                        <FontAwesomeIcon icon="times" />
                    </button>

                    <nav>
                        <ul>
                            <li key='home'>
                                <Link to={ROUTES.HOME}>
                                    Начало
						        </Link>
                            </li>

                            {this.state.links.map(el =>
                                <li key={el}>
                                    <Link to={`${ROUTES.RECIPES}/${el}`}>{el}</Link>
                                </li>
                            )}

                            {this.context ?
                                <Fragment>
                                    {authUserSubLinks}
                                    {authUserLinks}
                                </Fragment>

                                :

                                <Fragment>{unauthUserLinks}</Fragment>
                            }
                        </ul>

                    </nav>
                </div>
            </Fragment>
        )
    }

}

export default MobileMenu