const express = require('express');

const { getAllUsers, updateUser, getUser } = require('../controllers/UserController');
const { check } = require("express-validator")

const router = express.Router();

router.get('/users', getAllUsers);
router.put('/user', updateUser);
router.get('/user', getUser);



module.exports = {
    routes: router
}