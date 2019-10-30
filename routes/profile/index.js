const express = require('express');
const router = express.Router();
const path = require('path');


router.get('/', function (req, res) {
    fs.readJson(req.session.lang.htmlData.index, (err, obj) => {
        if (err) Error.send(err, res, logw, req.session.lang.erros.readFile);
        res.set('Connection', 'close');
        res.render('profile', {
            lang: "ru",
            title: "PavQR",
            appName: "PavQR",
            initLang: "EN",
            data: obj
        });
        res.end();
    });
});

module.exports = router;