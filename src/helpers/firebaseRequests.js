import { databaseURL, recipeDB} from "../constants/db.js";

const postCreate = (data) =>  {
    return fetch(`${databaseURL}/${recipeDB}.json`, {
        method: "POST",
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data)
    })
};

const getData = () => {
    return fetch(`${databaseURL}/${recipeDB}.json`).then(response => response.json())
}


export {
    postCreate,
    getData
}