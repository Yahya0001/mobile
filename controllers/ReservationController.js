'use strict';

const firebase = require('../db');

const Reservation = require('../models/reservation');

const firestore = firebase.firestore();

const Create = async (req, res, next) => {
    var user = firebase.auth().currentUser
    if (user) {
        try {
            var jsonUser = {
                "customer_id": user.uid,
                "start_date": req.body.start_date,
                "end_date": req.body.end_date,
                "type": req.body.type,
                "housekeeper_id": req.body.housekeeper_id,
                "state": "pending",
            };
            await firestore.collection('reservations').doc().set(jsonUser);
            res.send("reservations added ! ");
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
    else {
        res.send("Acces Denied !")
    }

}

const getAllReservations = async (req, res, next) => {
    const user = firebase.auth().currentUser
    if (user) {
        try {
            const reservations = await firestore.collection('reservations');
            const data = await reservations.get();
            const usersArray = [];
            if (data.empty) {
                res.status(404).send('No Reservations record found');
            } else {
                data.forEach(doc => {
                    if (doc.data().state == "pending") {
                        usersArray.push(doc.data());
                    }
                });
                res.send(usersArray);
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
    else {
        res.send("Acces Denied !")
    }
}

const ApproveState = async (req, res, next) => {
    var user = firebase.auth().currentUser
    if (user) {
        try {
            const id = req.params.id
            const jsonUser = {
                "state": "approved",
            };
            var reservation = await firestore.collection('reservations').doc(id);
            var Ourreservation = await reservation.get()
            console.log(user.uid, Ourreservation.data().housekeeper_id)
            if (Ourreservation.data().housekeeper_id == user.uid) {
                await reservation.update(jsonUser);
                res.send("reservations Approved!");
            }
            else {
                res.send("Acces Denied !");
                console.log(Ourreservation.housekeeper_id == user.uid);
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
    else {
        res.send("Acces Denied!")
    }

}
const RejectState = async (req, res, next) => {
    var user = firebase.auth().currentUser
    if (user) {
        try {
            const id = req.params.id
            const jsonUser = {
                "state": "rejected",
            };
            var reservation = await firestore.collection('reservations').doc(id);
            var Ourreservation = await reservation.get()
            console.log(user.uid, Ourreservation.data().housekeeper_id)
            if (Ourreservation.data().housekeeper_id == user.uid) {
                await reservation.update(jsonUser);
                res.send("reservations rejected!");
            }
            else {
                res.send("Acces Denied !");
                console.log(Ourreservation.housekeeper_id == user.uid);
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
    else {
        res.send("Acces Denied!")
    }

}
module.exports = {
    Create, ApproveState, RejectState, getAllReservations
}