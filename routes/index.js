const express = require('express');
const User = require('../controller/user_data.js');

module.exports = initRoutes = (app) => {
    let routes = express.Router();
    routes.get("/new", (req, res) => User.process(req, res));
    return routes;
};