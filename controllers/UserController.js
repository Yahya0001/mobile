'use strict';

const firebase = require('../db');


const firestore = firebase.firestore();

const getAllUsers = async (req, res, next) => {
    const user = firebase.auth().currentUser;
    const me = await firestore.collection('users').doc(user.uid);
    const data = await me.get();
    if (user && data.data().state == "customer") {
        try {
            const users = await firestore.collection('users');
            const data = await users.where("state", "==", "housekeeper").get();
            const usersArray = [];
            if (data.empty) {
                res.status(404).send('No User record found');
            } else {
                data.forEach(doc => {
                    usersArray.push(doc.data());
                });
                res.send(usersArray);
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
    else {
        res.status(403).json("Acces Denied!");
    }

}
const updateUser = async (req, res, next) => {
    const user = firebase.auth().currentUser;
    if (user) {
        try {
            const data = req.body;
            const user = await firestore.collection('users').doc(user.uid);
            await user.update(data);
            res.send('User record updated successfuly');
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
    else {
        res.status(403).json("Acces Denied!")
    }

}
const getUser = async (req, res, next) => {
    const user = firebase.auth().currentUser;
    if (user) {
        try {
            const me = await firestore.collection('users').doc(user.uid);
            const data = await me.get();
            if (!data.exists) {
                res.status(404).send('User with the given ID not found');
            } else {
                res.send(data.data());
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
    else {
        res.status(403).json("Acces Denied !")
    }

}
module.exports = {
    getAllUsers, updateUser, getUser
}