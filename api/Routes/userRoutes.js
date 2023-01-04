const router = require('express').Router();
const mysql = require('mysql2');
const bcrypt = require('bcrypt')


const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'shsid107001',
    database: 'ryan_db'
})

const saltRounds = 12;

//test route for setting up the user router
router.get('/test', (req, res) => {
    const dbQuery = `SELECT * FROM user_db`;
    db.query(dbQuery, (error, result) => {
        if(error){
            console.log(`error in the test route`, error);
        } else {
            console.log(`I hit the test route properly`, result);
            res.send(result);
        }
    })
})

//add Post method for Create Account
router.post('/add', (req, res) => {
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

//route to JOIN the user table info and the location info for all markers on the map component
router.get('/allUserLocations', (req, res) => {
    const dbQuery = `SELECT u.first, u.last, loc.timestamp, loc.latitude, loc.longitude
                        FROM user_db AS u
                        JOIN location_table AS loc
                        ON u.id = loc.userId;`;
    db.query(dbQuery, (error, result) => {
        if(error){
            console.log(`there was an error getting marker data`, error);
        } else {
            res.send(result);
        }
    })
});

//add get method for login and Create Account
router.get('/get/:email/:password', (req, res) => {
    console.log(`transferred hit`);
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
router.get('/get/:id', (req, res) => {
    const {id} = req.params;
    console.log(id);
    const dbQuery = "SELECT * FROM user_db WHERE id=?";
    db.query(dbQuery, id, (error, result) => {
        if(error){
            console.log(`Something went wrong getting user by id`);
        }
        console.log(result);
        res.send(result);
    })
});

//get total number of users
router.get('/count', (req, res) => {
    const dbQuery = "SELECT COUNT(DISTINCT id) AS 'user_total' FROM user_db";
    db.query(dbQuery, (error, result) => {
        if(error){
            console.log(`Error selecting user count`, error);
        }

        res.send(result);
    })
});

//add PUT method to update forgotten password
router.put('/put/:id', (req, res) => {
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
router.put('/:id', (req, res) => {
    const {id} = req.params;
    const oEmail = req.body.user.email;
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
router.put(`/account/add`, (req, res) => {
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
//method to update the account_status table upon deletion of account
router.put(`/account/delete`, (req, res) => {
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

//delete user from the user_db table
router.delete(`/delete/:id`, (req, res) => {
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

//method to get user via email for Oauth/SSO
router.get('/:email', (req, res) => {
    console.log(req.params, "in the routes");
    const dbQuery=`SELECT * FROM user_db WHERE email=?`
    db.query(dbQuery, req.params.email, (error, result) => {
        if(error){
            console.log(`Error fetching user`);
            res.send({Error: `User name does not exist in our system!`})
        } else {
            if(result.length !== 0){
                res.send(result);
            } else {
                res.send({error: `Username ${req.params.email} does not exist in our system!`})
            }
        }
    })
})

//method to add deleted user to the deletion table ----- may me not necessary
router.put(`/delete/add`, (req, res) => {
    let {id, user} = req.body;
    // console.log(`deleted from user router`);
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

module.exports = router;