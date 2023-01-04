const router = require('express').Router();
const mysql = require('mysql2');
const bcrypt = require('bcrypt')


const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'shsid107001',
    database: 'ryan_db'
})

//get total number of users and timestamp
router.get('/timechart', (req, res) => {
    const dbQuery = `with data as(
                                SELECT 
                                    DATE(timestamp_created) AS date,
                                    COUNT(account_id) AS total
                                    FROM account_status
                                    GROUP BY date
                                    UNION ALL 
                                SELECT
                                    DATE(timestamp_deleted) AS time_deleted,
                                    -COUNT(CASE WHEN account_status = 0 THEN 1 ELSE NULL END) AS deletion_count
                                    FROM account_status
                                    GROUP BY time_deleted
                                    ORDER BY date)
                                        SELECT DISTINCT
                                            date, SUM(total) OVER (ORDER BY date) AS cumulative_total FROM data`
    db.query(dbQuery, (error, result) => {
        if(error){
            console.log(`screwed up query`, error);
        }
        console.log(result);
        if(result.length !== 0){
            res.send(result)
        } else {
            res.send({error: `No accounts created yet`})
        }
    })
});

//get method to retrieve user data from user_db
router.get('/all', (req, res) => {
    // console.log(`endpoint hit`);
    const dbQuery = 'SELECT * FROM user_db ORDER BY timestamp';
    db.query(dbQuery, (error, result) => {
        if(error){
            console.log(`error getting user data from the db`, error);
        } else if(result.length === 0){
            console.log(`No users in the db`);
            res.send({ error: `no users in the user_db`});
        } else {
            // console.log(result);
            res.send(result);
        }
    })
})

    module.exports = router;

