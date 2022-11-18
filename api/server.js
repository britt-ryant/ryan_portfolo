const express = require('express');
const bodyparser = require('body-parser');
const colors = require ('colors');
const cors = require('cors');
const dotenv = require('dotenv');
const mysql = require('mysql2');
const { response } = require('express');
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

//get messages that user sent for their profile

app.get('/api/get/:email', (req, res) => {
    console.log("hit endpoint");
    console.log(req.params);
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
    console.log(getEmail);

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
        const dbQuery = "INSERT INTO user_db VALUES(?, ?, ?, ?, ?, ?)";
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

//add PUT method to update user info

app.put('/user/:id', (req, res) => {
    const {id} = req.params;
    const oEmail = req.body.user.email;
    // const {first, last, email, password} = req.body.user
    const {first, last, email, password} = req.body.formData;
    console.log(id, first, last, email, password);
    console.log( oEmail);
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

})




app.get('/api/hello', (req, res) => {
    res.send({ express: "Hello from express!"});
});

app.listen(port, () => console.log(`Server Up and Running, listening on PORT ${port}`.green.bold))