const express = require('express');
const router = express.Router();
const path = require('path');


router.get('/', function (req, res) {
    res.set('Connection', 'close');
    res.render('profile', {
        lang: "ru",
        title: "Профиль"
    });
    res.end();
});

module.exports = router;