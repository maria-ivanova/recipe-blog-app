import { auth } from "../services/firebase.js";
import { databaseURL, usersDB} from "../constants/db.js";

const registerUser = (email, password) => auth.createUserWithEmailAndPassword(email, password);
 
const createUser = (data) =>  {
    return fetch(`${databaseURL}/${usersDB}.json`, {
        method: "POST",
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => console.log('User created successfully'))
    .catch(error => console.log(error))
};

const loginUser = (email, password) => auth.signInWithEmailAndPassword(email, password);

const logout = () => {
    return auth.signOut()
};

const passwordUpdate = (password) => auth.currentUser.updatePassword(password);

export {
    registerUser,
    createUser,
    loginUser,
    logout,
    passwordUpdate
}

