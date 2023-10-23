const express = require('express');
const routes = express.Router();

routes.get('/', (req, res) => {
    res.send("Staff page")
});

module.exports = routes;