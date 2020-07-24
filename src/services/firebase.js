import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBosM9Uxk9ftXMyt4jFsTAczAZaasxb8oE",
    authDomain: "recipe-blog-e52f2.firebaseapp.com",
    databaseURL: "https://recipe-blog-e52f2.firebaseio.com",
    projectId: "recipe-blog-e52f2",
    storageBucket: "recipe-blog-e52f2.appspot.com",
    messagingSenderId: "441320101691",
    appId: "1:441320101691:web:5a3d23872a331330e6091e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.database();
export const storage = firebase.storage()