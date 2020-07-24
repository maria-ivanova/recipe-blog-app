import { auth } from "../services/firebase.js";
import { databaseURL, recipeDB} from "../constants/db.js";

const postCreate = (data) =>  {
    return fetch(`${databaseURL}/${recipeDB}.json`, {
        method: "POST",
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data)
    })


};

export {
    postCreate
}