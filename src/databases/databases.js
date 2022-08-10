const mysql = require('mysql');
const {promisify} = require('util');
const pool = mysql.createPool({
    host: 'b5yuj6ogqelkg7ybjxus-mysql.services.clever-cloud.com',
    user: 'uaxikfqgajubj9ix',
    password: 'CCJfvG4S0WFRxgaYQ0RL',
    database: 'b5yuj6ogqelkg7ybjxus',  
});

pool.getConnection((err, connection) => {
    if(err) {
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('DATBASE CONNECTION WAS CLOSED');
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('DATABASE HAS TO MANY CONNECTIONS');
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
    }

    if(connection){
        connection.release();
    }
    console.log('DB CONECTADA');
    return;
})

pool.query = promisify(pool.query);

module.exports = pool;