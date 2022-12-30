const router = require('express').Router();
const mysql = require('mysql2');


const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'shsid107001',
    database: 'ryan_db'
})


router.get('/test', (req, res) => {
    console.log(`hit the endpoint properly!`);
});

router.post('/addLocation', (req, res) => {
    const {id, userId, latitude, longitude} = req.body;
    const dbQuery = `INSERT INTO location_table VALUES(?, ?, CURRENT_TIMESTAMP, ?, ?)`
    db.query(dbQuery,[id, userId, latitude, longitude], (error, result) => {
        if(error){
            console.log(`error entering location to db`, error);
        } else {
            res.send(result);
        }
    })
})


module.exports = router;