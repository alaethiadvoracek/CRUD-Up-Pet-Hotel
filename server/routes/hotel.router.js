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

router.put('/update/:id', (req, res) => {
    const queryText = 'UPDATE pets SET name = $1, breed = $2, color = $3 WHERE id = $4';
    pool.query(queryText, [req.body.name, req.body.breed, req.body.color, req.params.id])
        .then((result) => {
            console.log('update result:', result.rows);
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log('update error:', err);
            res.sendStatus(500);
        });
});




module.exports = router;