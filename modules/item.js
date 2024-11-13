const express = require('express');
const db = require('./database');
const uuid = require('uuid');
const router = express.Router();

// ITEM routes
router.post('/', (req, res) => {
    db.query(
        `INSERT INTO items (title, type, available) VALUES (?, ?, ?)`,
        [req.body.title, req.body.type, 1],
        (err, results) => {
            if (err) {
                console.error('Error fetching items:', err);
                res.status(500).send('Database error');
                return;
            }

            res.redirect('/admin/items');
        }
    );
});

router.post('/modify', (req, res) => {
    db.query(
        `UPDATE items SET title = ?, type = ? WHERE items.item_id = ?;`,
        [req.body.title, req.body.type, req.body.id],
        (err, results) => {
            if (err) {
                console.error('Error fetching items:', err);
                res.status(500).send('Database error');
                return;
            }

            res.redirect('/admin/items');
        }
    );
});

router.post('/delete', (req, res) => {
    console.log('cda');
    db.query(`DELETE FROM items WHERE item_id = ?`, [req.body.id], (err, results) => {
        if (err) {
            console.error('Error fetching items:', err);
            res.status(500).send('Database error');
            return;
        }

        res.redirect('/admin/items');
    });
});

module.exports = router;
