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
        let todayUtanHaromNappal = moment(new Date()).add(3, 'days').format('YYYY-MM-DD');
        db.query(`INSERT INTO rentals (user_id, item_id, rental_date, return_date) VALUES (?,?,?,?)`, [req.session.userID, req.body.id, today, todayUtanHaromNappal], (err, results)=>{
            if (err){
                console.log
                req.session.msg = 'Adatbázishiba!';
                req.session.severity = 'danger';
                res.redirect('/kolcsonzo');
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
