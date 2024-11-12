const express = require('express');
const db = require('./database');
const uuid = require('uuid');
const router = express.Router();

// ITEM routes

router.get('/items', (req, res) => {
    const query = `
      SELECT item_id, title, type
      FROM items
      WHERE available = true;
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching items:', err);
            res.status(500).send('Database error');
            return;
        }

        res.json(results);
    });
});

module.exports = router;
