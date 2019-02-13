const express = require( 'express' );
const app = express();
// const pg = require('pg');
const bodyParser = require( 'body-parser' );
const PORT = 5000;
const pool = require('./modules/pool')



// const pool = pg.Pool({
//     host: 'localhost',   //where is your database
//     port: 5432,          // what port is your database on
//     database: 'restuarants', //name of database
//     max: 10,                    // max # of connections
//     idleTimeoutMillis: 30000 
// });

app.use(bodyParser.urlencoded({ extended: true }));


// serve back static files
app.use(express.static('server/public'));

// spin up server
app.listen(PORT, function(){
  console.log('server running on: ', PORT);
}); 

// pool.on('connect', () => {
//     console.log('Postgresql connected');
// });

// pool.on('error', (error) => {
//     console.log('Error with postgres pool', error);
    
// });

app.get('/restaurants', (req, res) => {
    pool.query('SELECT * FROM "restaurants"')
    .then((response) => {
        // console.log('response:', response.rows);
       
       res.send(response.rows);
    }).catch((error) => {
        console.log('error with restaurant select:', error);
        res.sendStatus(500);
    })
});


app.post('/new', (req, res) => {
    console.log('/restuarants post route was hit');
    pool.query(`INSERT INTO "restaurants" ("name", "type")
    VALUES ( $1, $2 );`, [req.body.name, req.body.type])
    .then(() => {
        res.sendStatus(200)
    }).catch((error) => {
        console.log('error with restuarant insert:', error);
        res.sendStatus(500)
    })
});

app.delete('/restaurants', (req, res) => {
    console.log('in /restaurants DELETE:', req.body);
    pool.query(`DELETE FROM "restaurants" WHERE ("id" = ${req.body.index})`)
    res.send('ribbet');


})

