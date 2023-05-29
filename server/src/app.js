require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');

const app = express();

if (process.env.NODE_ENV != 'test') {
    app.use(morgan('tiny'));
}


app.use(cors({ original: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.redirect(process.env.FE_HOST);
})
app.use('/api/v1', routes);

module.exports = app;