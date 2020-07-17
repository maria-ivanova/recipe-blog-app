import React, { Component } from 'react';
import mainStyles from '../styles/app.module.css';
import styles from '../styles/searchForm.module.css'

class SearchForm extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <form action="" method="" className={styles.search_form}>
                <input type="text" name="search" class={`${mainStyles.input_text} ${styles.input_text}`} />
                <button type="submit" value="search" class={styles.btn}></button>
			</form>
        )
    } 
}

export default SearchForm;