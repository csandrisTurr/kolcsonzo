const express = require('express');
const db = require('./database');
const uuid = require('uuid');
const router = express.Router();

// STEPS routes

router.post('/newdata', (req, res)=>{
     let { date, stepcount } = req.body;

     if (!date || !stepcount) {
        req.session.msg = 'Missing data!';
        req.session.severity = 'danger';
        res.redirect('/newdata');
        return
    }

    db.query(`SELECT * FROM stepdatas WHERE userID=? AND date=?`, [req.session.userID, date], (err, results) => {
        if (err){
            req.session.msg = 'Database error!';
            req.session.severity = 'danger';
            res.redirect('/newdata');
            return
        }

        if (results.length > 0){
            // update
            db.query(`UPDATE stepdatas SET count = count + ? WHERE ID=?`, [stepcount, results[0].ID], (err, results)=>{
                if (err){
                    req.session.msg = 'Database error!';
                    req.session.severity = 'danger';
                    res.redirect('/newdata');
                    return
                }
                req.session.msg = 'Stepdata updated!';
                req.session.severity = 'success';
                res.redirect('/newdata');
                return
            });
        }else{
            // insert
            db.query(`INSERT INTO stepdatas VALUES(?,?,?,?)`, [uuid.v4(), req.session.userID, date, stepcount], (err, results)=>{
                if (err){
                    req.session.msg = 'Database error!';
                    req.session.severity = 'danger';
                    res.redirect('/newdata');
                    return
                }
                req.session.msg = 'Stepdata inserted!';
                req.session.severity = 'success';
                res.redirect('/newdata');
                return
            });
        }
        return
    });
});

module.exports = router;