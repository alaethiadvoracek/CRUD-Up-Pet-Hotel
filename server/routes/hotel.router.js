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

router.delete('/:id', (req, res) => {
    const queryText = 'DELETE FROM pets WHERE "id"= $1'
    pool.query(queryText, [req.params.id])
        .then((result) => {
         console.log('query results: ', result);
        res.sendStatus(201);
    })
    .catch((err) => {
        console.log('error making insert query:', err);
        res.sendStatus(500);
    });
})//end delete in database 



router.post('/registerPet', (req,res)=>{
   //const queryText ='INSERT INTO pets (name, breed, color) VALUES ($1, $2, $3) RETURNING id';
    
    console.log('came in from client: ', req.body);
    
});




module.exports = router;