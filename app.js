const path = require('path');
const express = require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const dotenv=require('dotenv');

const app=express();

app.use(bodyParser.json());
const User=require('./models/user')
const Chat=require('./models/chat')
const Resetpassword=require('./models/resetP')
const Group=require('./models/group')
const sequelize=require('./util/database')

dotenv.config();
app.use(cors({origin:'http://127.0.0.1:5500'}));

const userRoute=require('./routes/user')
const chatRoute=require('./routes/chat')
const resetPRoute=require('./routes/resetP');
const grouproute=require('./routes/group')


app.use(userRoute)
app.use(chatRoute)
app.use(resetPRoute)
app.use(grouproute)


User.hasMany(Chat);
Chat.belongsTo(User);

User.hasMany(Resetpassword)
Resetpassword.belongsTo(User)


sequelize.sync()
.then((result) => {
    app.listen(3000)
}).catch((err) => {
    console.log(err);
});
