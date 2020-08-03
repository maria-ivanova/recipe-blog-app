import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getItemInfo, postEdit } from '../helpers/firebaseRequests.js';
import { storage } from "../services/firebase.js";
import { customErrors } from '../constants/errors.js';

import ROUTES from '../constants/routes.js';
import WithAuthorization from './withAuthorization.js';

import Notifications, { notify } from './notifications.js';

import { PageTitleContext } from '../context/context.js';
import PageTitle from './pageTitle.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import mainStyles from '../styles/app.module.css';
import styles from '../styles/create.module.css';

class Edit extends Component {
    constructor(props) {
        super(props)

        this.state = {
            creatorId: '',
            creatorName: '',
            createdDate: '',
            title: '',
            category: '',
            totalTime: '',
            yields: '',
            image: null,
            imageUrl: '',
            ingredients: '',
            recipeDescription: '',
            likes: 0,
            likesArr: [],
            errorMsg: null,
            allCategories: []
        }
        
    }

    getAllCategories = async () => {
        const allCategories = Object.values(await getCategories())[0];

        this.setState({
            allCategories
        })
    }

    getInfo = async (id) => {
        await getItemInfo(id)
            .then(response => response.json())
            .then(data => {

                if (!data) {
                    this.props.history.push(ROUTES.NOT_FOUND);
                    return;
                }

                this.setState({ ...data });
            })
            .catch(error => this.props.history.push(ROUTES.NOT_FOUND));
    }

    componentDidMount() {
        const itemId = this.props.match.params.id;
        this.getAllCategories();
        this.getInfo(itemId);
    }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    imageHandler = async (event) => {
        if (event.target.files[0]) {
            const image = event.target.files[0];
            await this.setState({ image });
        }
    }

    deleteImage = () => {
        this.setState({
            imageUrl: '',
            image: null,
        })
    }

    editRecipe = (itemId, data) => {
        delete data['errorMsg'];
        delete data['allCategories'];

        postEdit(itemId, data)
            .then(response => {
                this.setState({
                    errorMsg: ''
                })

                notify('success', 'Успешно редактиране на рецепта!');
            })
            .catch(error => {
                this.setState({
                    errorMsg: customErrors['failedEdit']
                })
            })
    }

    submitHandler = async (event) => {
        event.preventDefault();
        const data = {...this.state};
        const itemId = this.props.match.params.id;

        if (data.title.trim() === '' || data.category.trim() === '' || 
            data.totalTime.trim() === '' || data.yields.trim() === '' || 
            data.ingredients.trim() === '' || data.recipeDescription.trim() === '') {

            this.setState({
                errorMsg: customErrors['requiredFields']
            })

            return;
        }

        if (!Number.isInteger(Number(data.yields)) || Number(data.yields) <= 0 || data.yields.includes('.')) {
            this.setState({
                errorMsg: customErrors['mustBeInteger']
            })

            return;
        }

        if (data.totalTime.length > 10) {
            this.setState({
                errorMsg: customErrors['maxLengthTotalTime']
            })

            return;
        }

        if (!data.image && !data.imageUrl) {
            this.setState({
                errorMsg: customErrors['missingImage']
            })

            return;
        }

        if (data.imageUrl) {
            this.editRecipe(itemId, data);
            return;
        }

        const uploadTask = storage.ref(`images/${data.image.name}`).put(data.image);

        uploadTask.on('state_changed', (snapshot) => {
            console.log(snapshot);

        }, (error) => {
            this.setState({
                errorMsg: customErrors['failedEdit']
            })

        }, () => {
            storage
                .ref("images")
                .child(data.image.name)
                .getDownloadURL()
                .then(imageUrl => {
                    this.setState({ imageUrl });
                    const data = {...this.state};
                    this.editRecipe(itemId, data);
                });
        })
    }

    render() {
        const {
            title,
            category,
            totalTime,
            yields,
            image,
            imageUrl,
            ingredients,
            recipeDescription,
            errorMsg,
            allCategories
        } = this.state;

        const id = this.props.match.params.id;

        return (
            <section className={`${mainStyles.sec} ${mainStyles.content_sec}`}>
                <div className={`${mainStyles.container} ${mainStyles.tcenter}`}>
                    <Notifications />

                    <PageTitleContext.Provider value="Редактиране на рецепта">
                        <PageTitle />
                    </PageTitleContext.Provider>

                    <h3 className={styles.inner_title}>
                        Kъм рецептата <Link to={`${ROUTES.DETAILS}/${id}`}>{title}</Link>
                    </h3>

                    <form onSubmit={this.submitHandler} className={styles.recipe_form}>
                        {errorMsg ? <div className={mainStyles.errorMsg}>{errorMsg}</div> : null}

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

                                {allCategories.map(el => <option key={el}>{el}</option>)}
                            </select>
                        </div>

                        <div className={mainStyles.input_row}>
                            <label className={mainStyles.lbl}>
                                Време за приготвяне (макс. 10 символа) <span className={mainStyles.tred}>*</span>
                            </label>

                            <input type="text"
                                name="totalTime"
                                value={totalTime}
                                onChange={this.changeHandler}
                                placeholder="20 мин. / 1 час / 2 часа"
                                className={`${mainStyles.input_text} ${styles.input_text}`}
                                required />
                        </div>

                        <div className={mainStyles.input_row}>
                            <label className={mainStyles.lbl}>
                                Порции <span className={mainStyles.tred}>*</span>
                            </label>

                            <input type="text"
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
                                {imageUrl ?
                                    <div className={styles.img_box}>
                                        <img src={imageUrl} alt="recipe pic" />
                                        <span onClick={this.deleteImage}
                                            className={styles.btnDeleteImg}>

                                            <FontAwesomeIcon icon="times" />
                                        </span>
                                    </div>

                                    :

                                    <span>
                                        {image ? image.name : 'Все още няма качена снимка'}
                                    </span>
                                }

                            </span>

                            {imageUrl ? null :
                                <label className={`${mainStyles.btn} ${styles.upload_btn}`}>
                                    <input type="file"
                                        onChange={this.imageHandler} />
                                    <FontAwesomeIcon icon="upload" className={styles.fa} />
                                    качи
                                </label>
                            }
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
                                Редактирай
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        )
    }
}

const condition = authUser => authUser != null;
export default WithAuthorization(condition, Edit);