const express = require('express');
const cors = require('cors');
const controller = require('../controller/user-controller');
const route = express.Router();
const jwt = require('jsonwebtoken');

const corsOptions = {
    origin: true,
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true,
    maxAge: 3600
};

route.post('/api/signup', cors(corsOptions), controller.create);
route.post('/api/login', cors(corsOptions), controller.login);
route.get('/api/username', controller.verifyToken, cors(corsOptions), controller.find);
route.put('/api/user/:id', cors(corsOptions), controller.update);
route.delete('/api/users', cors(corsOptions), controller.delete);

module.exports = route;