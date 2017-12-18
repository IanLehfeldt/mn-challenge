const express = require('express');
const router = express.Router();
const request = require('request');
const nodeMailer = require('nodemailer');
// console.log('Contact router open');
const secretKey = require('../../config.js');
const pool = require('./pool.js');

// reCaptcha authorization route
router.post('/', function (req, res) {
    let captchaURL = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey.secret + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;

    if (req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
        return res.json({ "responseCode": 500, "responseDesc": "Please select captcha" });
    }

    request(captchaURL, function (err, response, body) {
        body = JSON.parse(body);
        // if captcha fails verification
        if (body.success !== undefined && !body.success) {
            return res.json({ "responseCode": 500, "responseDesc": "Failed captcha verification" });
        }

        // if captcha has a successful response, we start a database connection
        pool.connect(function (err, db, done) {
            done();
            if (err) {
                //err connecting to db
                return res.json({ "responseCode": 500, "responseDesc": "Connection to DB failed" });
            } else {
                let contact = req.body;
                //saving into contact_message_table in the senate_db
                db.query("INSERT INTO contact_messages_table (name, address, phonenumber, email, message, senator, district) VALUES ($1, $2, $3, $4, $5, $6);", [contact.name, contact.address, contact.phoneNumber, contact.email, contact.message, contact.senator, contact.district], function (err, result) {
                    if (err) {
                        return res.json({ "responseCode": 500, "responseDesc": "Could not save to DB" });
                    } else {
                        //on success of connection we try to find the senator's email either through the senator's name
                        if (contact.senator) {
                            db.query("SELECT email FROM senator_table WHERE name = $1;", [contact.senator], function (err, result) {
                                if (err) {
                                    return res.json({ "responseCode": 500, "responseDesc": "Could not find specified senator in database" });
                                } else {
                                    let senatorEmail = result.rows[0];
                                }
                            })
                        } else {
                            //if there is no senator name we attempt to join the district table with the senator table to find email
                            db.query("SELECT senator_table.email FROM senator_table JOIN district_table ON district_table.senator_id=senator_table.senator_id WHERE district_table.district_name = $1;", [contact.district], function (err, result) {
                                if (err) {
                                    return res.json({ "responseCode": 500, "responseDesc": "Could not find specified senator by district in database" });
                                } else {
                                    let senatorEmail = result.rows[0];
                                }
                            });
                        }

                        //nodemailer variables
                        let transporter = nodemailer.createTransport({
                            // host: 'smtp.example.com',
                            service: 'Gmail',
                            port: 465,
                            secure: true, // secure:true for port 465, secure:false for port 587
                            auth: {
                                user: secretKey.user,
                                pass: secretKey.password
                            }
                        });

                        let mailOptions = {
                            from: 'Senator Contact Form from: ' + contact.name,
                            to: senatorEmail,
                            subject: 'A Message from a Constituent',
                            html: contact.message
                        }

                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                res.json({ "responseCode": 500, "responseDesc": "Nodemailer error" });
                                return console.log(error);
                            } else {
                                return res.json({
                                    "responseCode": 200, "responseDesc": "Success"
                                });
                            }
                        })
                    }
                })
            }
        })
    });
});

module.exports = router;