import React, { Component } from 'react';
import styles from '../styles/pageTitle.module.css';

import PageTitleContext from '../context/context.js'

class PageTitle extends Component {
    static contextType = PageTitleContext;

    render() {
        return (
            <h2 className={styles.page_title}>
                <span>
                    {this.context}
                </span>
            </h2>
        )
    }
}

export default PageTitle;