require('dotenv').config();
const express = require('express');
var session = require('express-session');

const coreRoutes = require('./modules/core');
const userRoutes = require('./modules/user');
const rentalRoutes = require('./modules/rental');
const itemRoutes = require('./modules/item');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/assets', express.static('assets'));
app.use(session({ secret: process.env.SESSION_SECRET }));

// routes
app.use('/', coreRoutes);
app.use('/api/user', userRoutes);
app.use('/api/item', itemRoutes);
app.use('/api/rental', rentalRoutes);

app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
});
