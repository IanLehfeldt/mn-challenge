const express = require('express');
const router = express.Router();
const request = require('request');
// console.log('Contact router open');
const secretKey = require('../../config.js');


router.post('/', function (req, res) {
    let captchaURL = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey.secret + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;

    if (req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
        return res.json({ "responseCode": 400, "responseDesc": "Please select captcha" });
    }

    request(captchaURL, function (err, response, body) {
        body = JSON.parse(body);
        if (body.success !== undefined && !body.success) {
            return res.json({ "responseCode": 400, "responseDesc": "Failed captcha verification" });
        }
        res.json({
            "responseCode": 200, "responseDesc": "Success"
        });
    });

});

module.exports = router;