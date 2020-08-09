import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { getData } from '../helpers/firebaseRequests.js';
import ROUTES from '../constants/routes.js';

import mainStyles from '../styles/app.module.css';
import styles from '../styles/searchForm.module.css'

const INITIAL_STATE = {
    searchValue: '',
    data: []
}

class SearchForm extends Component {
    constructor(props) {
        super(props)

        this.state = { ...INITIAL_STATE }
    }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitHandler = async (event) => {
        event.preventDefault();

        const data = await getData();
        let dataArr = [];
        const regex = RegExp(this.state.searchValue, 'gmi');

        if (data) {
            dataArr = Object.keys(data).map(key => {
                return {
                    id: key,
                    ...data[key]
                }
            })
            .filter(el => regex.test(el.title) || regex.test(el.ingredients) || regex.test(el.recipeDescription) || regex.test(el.category))
        }

        this.setState({ data: dataArr });
        this.props.history.push(ROUTES.SEARCH, {searchItems: this.state.data})
        this.setState({...INITIAL_STATE});
    }

    render() {
        const { searchValue } = this.state;

        return (
            <form onSubmit={this.submitHandler} className={styles.search_form}>
                <input type="text"
                    name="searchValue"
                    value={searchValue}
                    onChange={this.changeHandler}
                    className={`${mainStyles.input_text} ${styles.input_text}`} />
                <button type="submit"  className={styles.btn}></button>
            </form>
        )
    }
}

export default withRouter(SearchForm);