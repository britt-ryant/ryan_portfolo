const router = require('express').Router();
const mysql = require('mysql2');
const bcrypt = require('bcrypt')


const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'shsid107001',
    database: 'ryan_db'
})

//get all messages in the info_db
router.get('/allMessages', (req, res) => {
    // console.log(`in the router and it was successful`);
    const dbQuery = "SELECT timestamp, first, last, email, message FROM info_db ORDER BY timestamp DESC;"
    db.query(dbQuery, (error, result) => {
        if(error){
            console.log(`Error in the get request to info db`, error);
        }
        // console.log(`Got all messages for Admin`, result);
        if(result.length === 0){
            res.send({error: `No messages to show yet...`})
        } else {
            res.send(result)
        }
    })
});

//get total number of messages
router.get('/totalMessages', (req, res) => {
    const dbQuery = "SELECT COUNT(info_db.message) AS message_count FROM info_db"
    db.query(dbQuery, (error, result) => {
        if(error){
            console.log(`Got an error getting total messages`, error);
        }
        if(result.length === 0){
            res.send({error: `No messages to show yet....`})
        } else {
            res.send(result)
        }
    })
});

//post method to add message to the info_dbb table
router.post('/add', (req, res) => {
    // console.log(`posting message`);
    const {id, timestamp, first, last, email, message} = req.body;
    const dbQuery = "INSERT INTO info_db VALUES (?, ?, ?, ?, ?, ?)";
    db.query(dbQuery, [id, timestamp, first, last, email, message], (error, result) => {
        if(error) {
            console.log("error adding to db ", error);
        }
        console.log('added to the db ', result);
        let addedInfo = {id: id, timestamp, first, last, email, message}
        res.send(addedInfo);
    })
});

//get messages that user sent for their profile
router.get('/get/:email', (req, res) => {
    // console.log(`getting bby email`);
    const {email} = req.params;
    const dbQuery = "SELECT * FROM info_db WHERE EMAIL=? ORDER BY timestamp DESC";
    db.query(dbQuery, email, (error, result) => {
        if(error){
            console.log("error getting info!", error);
        }
        if(result.length === 0){
            res.send({error: `No message to show sent by ${email}`});
        } else {
            res.send(result)
        }
    })
});

//get messages based on search parameters
router.get(`/search/:select/:searchString`, (req, res) => {
    // console.log(`searching messages`);
    console.log(req.params);
    const {select, searchString} = req.params;
    const dbQuery = `SELECT * FROM info_db AS results WHERE ${select} LIKE '%${searchString}%' ORDER BY timestamp DESC`;
    db.query(dbQuery, [select, searchString], (error, result) => {
        if(error){
            console.log(`there was an error retrieving search data`, error);
        }else if(result.length === 0){
            res.send({error: `No messages to show...`})
        } else {
            res.send(result);
        }
    })
})

module.exports = router;