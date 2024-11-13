const express = require('express');
const ejs = require('ejs');
const { route } = require('./user');
const router = express.Router();
const db = require('./database');
const moment = require('moment');

// CORE routes
router.get('/', (req, res) => {
    ejs.renderFile('./views/index.ejs', { session: req.session }, (err, html) => {
        if (err) {
            console.log(err);
            return;
        }
        req.session.msg = '';
        res.send(html);
    });
});

router.get('/register', (req, res) => {
    ejs.renderFile('./views/register.ejs', { session: req.session }, (err, html) => {
        if (err) {
            console.log(err);
            return;
        }
        req.session.msg = '';
        res.send(html);
    });
});

//newdata volt csak atirtam kolcsonzore
router.get('/kolcsonzo', (req, res) => {
    if (req.session.isLoggedIn) {
        let today = moment(new Date()).format('YYYY-MM-DD');

        db.query(`SELECT item_id, title, type FROM items WHERE available = true;`, (err, results) => {
            if (err) {
                console.error('Error fetching items:', err);
                req.session.msg = '';
                return;
            }

            ejs.renderFile('./views/kolcsonzo.ejs', { session: req.session, today, results }, (err, html) => {
                if (err) {
                    console.log(err);
                    return;
                }
                req.session.msg = '';
                res.send(html);
            });
        });
        return;
    }

    res.redirect('/');
});

router.get('/kolcsonzottek', (req, res) => {
    if (req.session.isLoggedIn) {
        let today = moment(new Date()).format('YYYY-MM-DD');

        db.query(`SELECT * FROM items INNER JOIN rentals ON items.item_id = rentals.item_id WHERE rentals.user_id = ? ORDER BY rentals.rental_date ASC;`, [req.session.userID], (err, results) => {
            if (err) {
                console.error('Error fetching items:', err);
                res.status(500).send('Database error');
                return;
            }

            ejs.renderFile('./views/kolcsonzottek.ejs', { session: req.session, today, results, moment }, (err, html) => {
                if (err) {
                    console.log(err);
                    return;
                }
                req.session.msg = '';
                res.send(html);
            });
        });

        return;
    }
    res.redirect('/');
});

router.get('/statistics', (req, res) => {
    if (req.session.isLoggedIn) {
        db.query(`SELECT * FROM stepdatas WHERE userID=? ORDER BY date ASC`, [req.session.userID], (err, results) => {
            if (err) {
                console.log(err);
                return;
            }

            let events = [];
            let labels = [];
            let datas = [];

            let total = 0;
            results.forEach((item) => {
                item.date = moment(item.date).format('YYYY.MM.DD.');
                total += item.count;
                events.push({
                    title: item.count + ' steps',
                    start: new Date(item.date),
                    allDay: true,
                });
                labels.push(`'${item.date}'`);
                datas.push(item.count);
            });

            ejs.renderFile(
                './views/statistics.ejs',
                { session: req.session, results, total, events, labels, datas },
                (err, html) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    req.session.msg = '';
                    res.send(html);
                }
            );
            return;
        });

        return;
    }
    res.redirect('/');
});

router.get('/admin/users', (req, res) => {
    if (req.session.isLoggedIn) {
        let today = moment(new Date()).format('YYYY-MM-DD');

        db.query(`SELECT * FROM users;`, [], (err, results) => {
            if (err) {
                console.error('Error fetching items:', err);
                res.status(500).send('Database error');
                return;
            }

            ejs.renderFile('./views/users.ejs', { session: req.session, today, results, moment }, (err, html) => {
                if (err) {
                    console.log(err);
                    return;
                }
                req.session.msg = '';
                res.send(html);
            });
        });

        return;
    }
    res.redirect('/');
});

router.get('/admin/rentals', (req, res) => {
    if (req.session.isLoggedIn) {
        let today = moment(new Date()).format('YYYY-MM-DD');

        db.query(`SELECT * FROM rentals INNER JOIN items ON items.item_id = rentals.item_id INNER JOIN users ON rentals.user_id = users.user_id ORDER BY rentals.rental_date ASC;`, [], (err, results) => {
            if (err) {
                console.error('Error fetching items:', err);
                res.status(500).send('Database error');
                return;
            }

            ejs.renderFile('./views/rentals.ejs', { session: req.session, today, results, moment }, (err, html) => {
                if (err) {
                    console.log(err);
                    return;
                }
                req.session.msg = '';
                res.send(html);
            });
        });

        return;
    }
    res.redirect('/');
});

router.get('/logout', (req, res) => {
    req.session.isLoggedIn = false;
    req.session.userID = null;
    req.session.userName = null;
    req.session.userEmail = null;
    req.session.isAdmin = false;
    req.session.msg = 'You are logged out!';
    req.session.severity = 'info';
    res.redirect('/');
});

module.exports = router;
