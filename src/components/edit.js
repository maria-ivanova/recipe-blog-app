import React, { Component } from 'react';
import { getCategories, getItemInfo, postEdit } from '../helpers/firebaseRequests.js';
import { storage } from "../services/firebase.js";
import { firebaseErrors, customErrors } from '../constants/errors.js';

import ROUTES from '../constants/routes.js';
import WithAuthorization from './withAuthorization.js';

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
        }

        this.allCategories = [];
    }

    getAllCategories = async () => {
        this.allCategories = Object.values(await getCategories())[0];
    }

    getInfo = async (id) => {
        await getItemInfo(id)
            .then(response => response.json())
            .then(data => {
                this.setState({ ...data });
            })
            .catch(error => console.log(error));
    }

    componentDidMount() {
        const id = this.props.match.params.id;

        this.getAllCategories();
        this.getInfo(id)
    }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    imageHandler = async (event) => {
        if (event.target.files[0]) {
            const image = event.target.files[0];
            await this.setState(() => ({ image }));
        }
    }

    deleteImage = () => {
        this.setState({
            imageUrl: '',
            image: null,
        })
    }

    submitHandler = async (event) => {
        event.preventDefault();

        const data = this.state;
        const id = this.props.match.params.id;
        delete data['errorMsg'];

        if (this.state.image) {
            const { image } = this.state;
            const uploadTask = storage.ref(`images/${image.name}`).put(image);

            uploadTask.on('state_changed', (snapshot) => {
                console.log(snapshot);

            }, (error) => {
                this.setState({
                    errorMsg: customErrors['failedCreate']
                })

            }, () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(imageUrl => {
                        this.setState({ imageUrl });

                        const data = this.state;
                        const id = this.props.match.params.id;
                        delete data['errorMsg'];

                        postEdit(id, data)
                            .then(response => {
                                console.log('successful editing');
                            })
                            .catch(error => {
                                this.setState({
                                    errorMsg: customErrors['failedEdit']
                                })
                            })
                    });
            })

        } else {
            postEdit(id, data)
                .then(response => {
                    this.props.history.push(`${ROUTES.EDIT}/${id}`);
                })
                .catch(error => {
                    this.setState({
                        errorMsg: customErrors['failedEdit']
                    })
                })
        }
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
            likes,
            likesArr,
            errorMsg
        } = this.state;

        return (
            <section className={`${mainStyles.sec} ${mainStyles.content_sec}`}>
                <div className={`${mainStyles.container} ${mainStyles.tcenter}`}>
                    <PageTitleContext.Provider value="Редактиране на рецепта">
                        <PageTitle />
                    </PageTitleContext.Provider>

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

                                {this.allCategories.map(el => <option key={el}>{el}</option>)}
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
                                {imageUrl ?
                                    <div className={styles.img_box}>
                                        <img src={imageUrl} alt="recipe image" />
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