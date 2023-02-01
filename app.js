const path = require('path');
const express = require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const app=express();

app.use(bodyParser.json());
const User=require('./models/user')
const sequelize=require('./util/database')

app.use(cors());

const userRoute=require('./routes/user')
app.use(userRoute)

sequelize.sync()
.then((result) => {
    app.listen(3000)
}).catch((err) => {
    console.log(err);
});
