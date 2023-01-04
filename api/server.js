const express = require('express');
const bodyparser = require('body-parser');
const colors = require ('colors');
const cors = require('cors');
const dotenv = require('dotenv');
// const mysql = require('mysql2');
//const { response } = require('express');
// const bcrypt = require('bcrypt');
const weatherRoute = require('./Routes/geoRoutes');
const userRoute = require('./Routes/userRoutes');
const apiRoutes = require('./Routes/apiRoutes');
const adminRoutes = require('./Routes/adminRoutes');

dotenv.config({ path: './config.env'});
const app = express();
const port = process.env.PORT || 5000;
// const saltRounds = 12;

// const db = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: "shsid107001",
//     database: "ryan_db"
// })
app.use(cors());
app.use(express.json());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended : true}));

app.use('/weather', weatherRoute);
app.use('/users', userRoute);
app.use('/api', apiRoutes);
app.use('/admin', adminRoutes);

//**************DEV SERVER TEST ROUTE ************************/
app.get('/apple/pie', (req, res) => {
    console.log('on the get')
    res.send({ express: "have a slice!"})
})
//***********************************************************/

app.listen(port, () => console.log(`Server Up and Running, listening on PORT ${port}`.green.bold))