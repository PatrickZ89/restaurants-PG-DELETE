const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/restaurants', (req, res) => {
    pool.query('SELECT * FROM "restaurants" ORDER BY "id";')
    .then((response) => {
        // console.log('response:', response.rows);
       
       res.send(response.rows);
    }).catch((error) => {
        console.log('error with restaurant select:', error);
        res.sendStatus(500);
    })
});


router.post('/new', (req, res) => {
    console.log('/restuarants post route was hit');
    pool.query(`INSERT INTO "restaurants" ("name", "type", "rating")
    VALUES ( $1, $2, $3 );`, [req.body.name, req.body.type, req.body.rating])
    .then(() => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('error with restuarant insert:', error);
        res.sendStatus(500);
    });
});
            // '/:id'
router.delete('/restaurants', (req, res) => {
    console.log('req.params:', req.params);
    
    console.log('in /restaurants DELETE:', req.body);
    pool.query(`DELETE FROM "restaurants" WHERE "id" = $1;`, [req.body.index]).then(() => {
            res.send(204)
    })
    
})

// router.put('/:id', req, res)

router.put('/restaurants', (req, res) => {
    console.log('req.params:', req.params);
    
    console.log('in /restaurants SAVING:', req.body);
    pool.query(`UPDATE "restaurants" SET "rating" = 5
    WHERE "id" = $1;`, [req.body.index]).then(() => {
    res.sendStatus(204)
    }).catch(error => {
        console.log('error with UPDATE', error);
        res.sendStatus(500)
    })
    
})


module.exports = router;