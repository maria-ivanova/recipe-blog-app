import React, { Component } from 'react';
import { postCreate } from '../helpers/firebaseRequests.js';
import { firebaseErrors, customErrors } from '../constants/errors.js';
import ROUTES from '../constants/routes.js';

import WithAuthorization from './withAuthorization.js';
import { AuthUserContext } from '../context/context.js';

import { PageTitleContext } from '../context/context.js';
import PageTitle from './pageTitle.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import mainStyles from '../styles/app.module.css';
import styles from '../styles/create.module.css';

const INITIAL_STATE = {
    creatorId: '',
    title: '',
    category: 'salad',
    totalTime: '',
    yields: '',
    imageUrl: '',
    ingredients: '',
    recipeDescription: '',
    likes: []
}

class Create extends Component {
    static contextType = AuthUserContext;

    constructor(props) {
        super(props)

        this.state = { ...INITIAL_STATE };
    }

    componentDidMount() {
        const userContext = this.context;

        if (userContext) {
            this.setState({
                creatorId: userContext.uid
            })
        }
    }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitHandler = (event) => {
        event.preventDefault();
        const data = this.state;

        postCreate(data)
        .then(response => {
            this.setState({...INITIAL_STATE});
            this.props.history.push(ROUTES.CREATE);
        })
        .catch(error => {
            this.setState({
                //errorMsg: customErrors['wrongUserPassword'] || error.message
            })
        })
    }

    render() {
        const {
            title,
            category,
            totalTime,
            yields,
            imageUrl,
            ingredients,
            recipeDescription
        } = this.state;

        return (
            <section className={`${mainStyles.sec} ${mainStyles.content_sec}`}>
                <div className={`${mainStyles.container} ${mainStyles.tcenter}`}>
                    <PageTitleContext.Provider value="Създай рецепта">
                        <PageTitle />
                    </PageTitleContext.Provider>

                    <form onSubmit={this.submitHandler} className={styles.recipe_form}>
                        <div className={mainStyles.input_row}>
                            <label className={mainStyles.lbl}>
                                Заглавие <span className={mainStyles.tred}>*</span>
                            </label>

                            <input type="text"
                                name="title"
                                value={title}
                                onChange={this.changeHandler}
                                className={`${mainStyles.input_text} ${styles.input_text}`}
                                required />
                        </div>

                        <div className={mainStyles.input_row}>
                            <label className={mainStyles.lbl}>
                                Категория <span className={mainStyles.tred}>*</span>
                            </label>

                            <select name="category"
                                value={category}
                                onChange={this.changeHandler}
                                className={`${mainStyles.input_text} ${styles.input_text}`}>
                                <option value="salad">Салати</option>
                                <option value="soup">Супи</option>
                                <option value="mainDish">Основни ястия</option>
                                <option value="dessert">Десерти</option>
                            </select>
                        </div>

                        <div className={mainStyles.input_row}>
                            <label className={mainStyles.lbl}>
                                Време за приготвяне <span className={mainStyles.tred}>*</span>
                            </label>

                            <input type="text"
                                name="totalTime"
                                value={totalTime}
                                onChange={this.changeHandler}
                                className={`${mainStyles.input_text} ${styles.input_text}`}
                                required />
                        </div>

                        <div className={mainStyles.input_row}>
                            <label className={mainStyles.lbl}>
                                Порции <span className={mainStyles.tred}>*</span>
                            </label>

                            <input type="number"
                                name="yields"
                                value={yields}
                                onChange={this.changeHandler}
                                className={`${mainStyles.input_text} ${styles.input_text}`}
                                required />
                        </div>

                        <div className={mainStyles.input_row}>
                            <label className={mainStyles.lbl}>
                                Качване на снимка <span className={mainStyles.tred}>*</span>
                            </label>

                            <span className={styles.img_holder}>
                                <span>Все още няма качена снимка</span>
                            </span>

                            <label className={`${mainStyles.btn} ${styles.upload_btn}`}>
                                <input type="file"
                                    name="uploadedImage" />
                                <FontAwesomeIcon icon="upload" className={styles.fa} />
								качи
							</label>
                        </div>

                        <div className={mainStyles.input_row}>
                            <label className={mainStyles.lbl}>
                                Необходими съставки <span className={mainStyles.tred}>*</span>
                            </label>

                            <textarea name="ingredients"
                                value={ingredients}
                                onChange={this.changeHandler}
                                className={`${mainStyles.input_text} ${styles.input_text}`}
                                required>
                            </textarea>
                        </div>

                        <div className={mainStyles.input_row}>
                            <label className={mainStyles.lbl}>
                                Начин на приготвяне <span className={mainStyles.tred}>*</span>
                            </label>

                            <textarea name="recipeDescription"
                                value={recipeDescription}
                                onChange={this.changeHandler}
                                className={`${mainStyles.input_text} ${styles.input_text}`}
                                required>
                            </textarea>
                        </div>

                        <div className={mainStyles.input_row}>
                            <button type="submit" className={mainStyles.btn}>
                                Създай
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        )
    }
}

const condition = authUser => authUser != null;
export default WithAuthorization(condition, Create);