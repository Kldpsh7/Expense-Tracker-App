const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./database/db');
const indexRoute = require('./routes/mainRoute');


const app = express();

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended:false}));
app.use('/',indexRoute);

sequelize.sync()
.then(()=>{
    app.listen(4000)
})
.catch(err=>console.log(err))