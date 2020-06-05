const express = require('express');

const router = express.Router();

// Get a list of clients from the Database
router.get('/clients', (req, res) => {
        res.send({type: 'GET'});
});

router.post('/clients', (req, res) => {
    res.send({type: 'POST'});
});

router.get('/clients/:id', (req, res) => {
    res.send({type: 'PUT'});
});

router.get('/clients/:id', (req, res) => {
    res.send({type: 'DELETE'});
});

module.exports = router;