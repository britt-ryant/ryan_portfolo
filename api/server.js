const express = require('express');
const bodyparser = require('body-parser');
const colors = require ('colors');
const cors = require('cors');
const dotenv = require('dotenv');
const mysql = require('mysql2');
//const { response } = require('express');
const bcrypt = require('bcrypt');

dotenv.config({ path: './config.env'});
const app = express();
const port = process.env.PORT || 5000;
const saltRounds = 12;

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: "shsid107001",
    database: "ryan_db"
})
app.use(cors());
app.use(express.json());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended : true}));

//**************DEV SERVER TEST ROUTE ************************/
app.get('/apple/pie', (req, res) => {
    console.log('on the get')
    res.send({ express: "have a slice!"})
})
//***********************************************************/

//get all messages in the info_db

app.get('/api/allMessages', (req, res) => {
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
app.get('/api/totalMessages', (req, res) => {
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

//get messages based on search parameters
app.get(`/search/:select/:searchString`, (req, res) => {
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

//get total number of users
app.get('/user/count', (req, res) => {
    const dbQuery = "SELECT COUNT(DISTINCT id) AS 'user_total' FROM user_db";
    db.query(dbQuery, (error, result) => {
        if(error){
            console.log(`Error selecting user count`, error);
        }

        res.send(result);
    })
});

//get total number of users and timestamp
app.get('/admin/timechart', (req, res) => {
    //const dbQuery = "with data as(select DATE(timestamp) as date, COUNT(id) as total_daily from user_db group by date) select date, total_daily, sum(total_daily) over(order by date) as cumulative_total from data";
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
})

//post method to add message to the info_dbb table
app.post('/api/add', (req, res) => {
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

//get method to retrieve user data from user_db
app.get('/admin/all', (req, res) => {
    console.log(`endpoint hit`);
    const dbQuery = 'SELECT * FROM user_db ORDER BY timestamp';
    db.query(dbQuery, (error, result) => {
        if(error){
            console.log(`error getting user data from the db`, error);
        } else if(result.length === 0){
            console.log(`No users in the db`);
            res.send({ error: `no users in the user_db`});
        } else {
            console.log(result);
            res.send(result);
        }
    })
})

//get messages that user sent for their profile
app.get('/api/get/:email', (req, res) => {
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
})

//add get method for login and Create Account
app.get('/user/get/:email/:password', (req, res) => {
    const { email, password } = req.params;
    const getEmail = "SELECT * FROM user_db WHERE email=?";
     db.query( getEmail, email, (error, result) => {
        if(error){
            console.log(`Something went wrong getting email: ${email} from db`, error);
        }
        console.log(result, "Found email in the db");
        if(result.length !== 0){
            bcrypt.compare(password, result[0].password).then((data) => {
                if(data){
                    res.send({
                        error: false,
                        result: result
                    });
                } else {
                    res.send({
                        error: `Username ${email} and Password don't match!`,
                        result: result
                    });
                }
            })
        } else {
            res.send({
                error: `Username ${email} does not exist in our system, please create an account!`,
                result: result,
                });
        }
    })
});

//method to get a user by specific id
app.get('/user/get/:id', (req, res) => {
    const {id} = req.params;
    const dbQuery = "SELECT * FROM user_db WHERE id=?";
    db.query(dbQuery, id, (error, result) => {
        if(error){
            console.log(`Something went wrong getting user by id`);
        }
        res.send(result);
    })
})

//add Post method for Create Account
app.post('/user/add', (req, res) => {
    console.log(req.body);
    const { id, first, last, email, password, admin } = req.body;
    bcrypt.hash(password, saltRounds).then((hashedPassword) => {
        console.log(hashedPassword);
        console.log(`add to user db: ${id}, ${first}, ${last}, ${email}, ${hashedPassword}, and if admin: ${admin}`);
        const dbQuery = "INSERT INTO user_db VALUES(?, CURRENT_TIMESTAMP,?, ?, ?, ?, ?)";
        db.query(dbQuery, [id, first, last, email, hashedPassword, admin], (error, result) => {
            if(error){
                console.log(`got an error entering user into db`, error);
            }
            console.log(`added user to db`, result);
            let addedUser = {id: id, first: first, last: last, email: email, password: password, admin: admin}
            res.send(addedUser);
        })
    })
});

//add PUT method to update forgotten password
app.put('/user/put/:id', (req, res) => {
    const {id} = req.params;
    const {password} = req.body;
    console.log("trying to enter Password: ", password);
    bcrypt.hash(password, saltRounds).then((hashedPassword) => {
        console.log(`changed ${password} to --> ${hashedPassword}`);
        const dbQuery = "UPDATE user_db SET PASSWORD=? WHERE ID=?";
        db.query(dbQuery, [hashedPassword, id], (error, result) => {
            if(error){
                console.log(`Got an error updating the password for user id: ${id}`);
            }
            //console.log(`updated password successfully ${password} and hashed password that was added: ${hashedPassword}`);
            console.log(`Updated id: ${id} using password ${password}`);
            let updatedUser = {id: id, password: password};
            res.send(updatedUser);
        })
    })
});

//add PUT method to update user inf0
app.put('/user/:id', (req, res) => {
    const {id} = req.params;
    const oEmail = req.body.user.email;
    // const {first, last, email, password} = req.body.user
    const {first, last, email, password} = req.body.formData;
    bcrypt.hash(password, saltRounds).then((hashedPassword) => {
        const dbQuery = `UPDATE user_db as u, info_db as i 
                            SET u.first=?, i.first=?, u.last=?, i.last=?, u.email=?, i.email=?, u.password=? 
                            WHERE u.email=? 
                            AND u.email=i.email`
        db.query(dbQuery, [first, first, last, last, email, email, hashedPassword, oEmail], (error, result) => {
            if(error){
                console.log(error);
            }
            const updatedInfo = {
                                    id: id,
                                    first: first,
                                    last: last,
                                    email: email,
                                    password: password
            }
            res.send(updatedInfo);
        })
    })

});

//method to add account creation instance to account_status
app.put(`/user/account/add`, (req, res) => {
    console.log(req.body);
    const {user, id} = req.body;
    let dbQuery = `INSERT INTO account_status VALUES(?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, ?)`;
    db.query(dbQuery, [id, user.active, user.id, user.first, user.last, user.email, user.deleteStamp], (error, result) => {
        if(error){
            console.log(`there was an error entering into the db`, error);
        } else {
            res.send(result);
        }
    })
})
//method to add deleted user to the deletion table ----- may me not necessary
app.put(`/delete/add`, (req, res) => {
    let {id, user} = req.body;
    console.log(user);
    console.log(id);
    let dbQuery = `INSERT INTO deletion_table VALUES(?, CURRENT_TIMESTAMP, ?, ?, ?, ?)`;
    db.query(dbQuery, [id, user.id, user.first, user.last, user.email], (error, result) => {
        if(error) {
            console.log(`there was an error entering into db`, error);
        } else {
            let deletedUser = {id: id, userId: user.id, first: user.first, last: user.last, email: user.email}
            res.send(deletedUser);
        }
    })
});

//delete user from the user_db table
app.delete(`/delete/:id`, (req, res) => {
    const {id} = req.params;
    const dbQuery = "DELETE FROM user_db WHERE id=?";
    console.log(`deleting on server`);
    db.query(dbQuery, id, (error, result) => {
        if(error){
            console.log(`there was an error finding user ${id}`);
        } else {
            console.log(`account was deleted`);
            res.send({deleteMessage: `Your account was deleted! We are sad to see you go, please come back soon!`})
        }
    })
});

//method to update the account_status table upon deletion of account
app.put(`/user/account/delete`, (req, res) => {
    const {id, active} = req.body;
    const dbQuery = `UPDATE account_status SET account_status=?, timestamp_deleted=CURRENT_TIMESTAMP WHERE account_id=?`
    db.query(dbQuery, [active, id], (error, result) => {
        if(error){
            console.log(`there was an error updating account status`, error);
        } else {
            res.send(result);
        }
    })
})

//test method
app.get('/api/hello', (req, res) => {
    res.send({ express: "Hello from express!"});
});

app.listen(port, () => console.log(`Server Up and Running, listening on PORT ${port}`.green.bold))