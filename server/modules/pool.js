const pg = require('pg');

const pool = pg.Pool({
    host: 'localhost',   //where is your database
    port: 5432,          // what port is your database on
    database: 'restuarants', //name of database
    max: 10,                    // max # of connections
    idleTimeoutMillis: 30000 
});



pool.on('connect', () => {
    console.log('Postgresql connected');
});

pool.on('error', (error) => {
    console.log('Error with postgres pool', error);
    
});


module.exports = pool;