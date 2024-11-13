const express = require('express');
const db = require('./database');
const uuid = require('uuid');
const router = express.Router();
const moment = require('moment');

// RENTAL routes
router.post('/rent', (req, res) => {
    db.query(`UPDATE items SET available = '0' WHERE item_id = ?`, [req.body.id], (err, results)=>{
        if (err){
            console.log(err)
            console.log(req.params)
            req.session.msg = 'Adatbázishiba!';
            req.session.severity = 'danger';
            res.redirect('/kolcsonzo');
            return
        }

        let today = moment(new Date()).format('YYYY-MM-DD');
        db.query(`INSERT INTO rentals (user_id, item_id, rental_date) VALUES (?,?,?)`, [req.session.userID, req.body.id, today], (err, results)=>{
            if (err){
                console.log
                req.session.msg = 'Adatbázishiba!';
                req.session.severity = 'danger';
                res.redirect('/kolcsonzo');
                return
            }
            req.session.msg = 'Rented item!';
            req.session.severity = 'success';
            res.redirect('/kolcsonzo');
            return
        })
    })
});

router.post('/bring_back', (req, res) => {
    db.query(`UPDATE items SET available = '1' WHERE item_id = ?`, [req.body.id], (err, results)=>{
        if (err){
            console.log(err)
            console.log(req.params)
            req.session.msg = 'Adatbázishiba!';
            req.session.severity = 'danger';
            res.redirect('/kolcsonzottek');
            return
        }

        let today = moment(new Date()).format('YYYY-MM-DD');
        db.query(`UPDATE rentals SET return_date = ? WHERE rental_id = ?`, [today, req.body.rental_id], (err, results)=>{
            if (err){
                console.log(err);
                req.session.msg = 'Adatbázishiba!';
                req.session.severity = 'danger';
                res.redirect('/kolcsonzottek');
                return
            }
            req.session.msg = 'Rented item!';
            req.session.severity = 'success';
            res.redirect('/kolcsonzottek');
            return
        })
    })
});

module.exports = router;
