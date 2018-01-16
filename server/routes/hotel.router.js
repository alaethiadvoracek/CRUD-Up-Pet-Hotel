const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');


router.post('/', (req, res) => {
    const queryString = 'INSERT INTO owners (first_name, last_name) VALUES ($1, $2)';
    pool.query(queryString, [req.body.firstName, req.body.lastName])
        .then(response => {
            console.log('hit post');
            res.send(response.rows);
        })
        .catch(err => {
            console.log('hit error of post');
            res.sendStatus(500);
        });
});




module.exports = router;