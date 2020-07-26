import { databaseURL, recipeDB, categoriesDB } from "../constants/db.js";

const postCreate = (data) => {
    return fetch(`${databaseURL}/${recipeDB}.json`, {
        method: "POST",
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data)
    })
};

const postEdit = (id, data) => {
    return fetch(`${databaseURL}/${recipeDB}/${id}.json`, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data)
    })
}

const getItemInfo = (id) => {
    return fetch(`${databaseURL}/${recipeDB}/${id}.json`);
}

const getData = () => {
    return fetch(`${databaseURL}/${recipeDB}.json`).then(response => response.json())
}

const getCategories = () => {
    return fetch(`${databaseURL}/${categoriesDB}.json`).then(response => response.json())
}

const deleteItem = (id) => {
    return fetch(`${databaseURL}/${recipeDB}/${id}.json`, {
        method: 'DELETE'
    })
}

export {
    postCreate,
    postEdit,
    getData,
    getCategories,
    deleteItem,
    getItemInfo
}