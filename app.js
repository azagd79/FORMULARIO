const express = require('express');
const app = express();
const hbs = require('hbs');

const dotenv = require('dotenv').config({path: './env/.env'});

///CREAR EL PUERTO
app.set('port',process.env.PORT);


////MIDDLEWARE
app.set('view engine','hbs');

app.use(express.urlencoded({extended:false}));
app.use('/resources',express.static('/public'));
app.use('/resources',express.static(__dirname + '/public'));

app.use(require('./routers/router'))



app.listen(app.get('port'),()=>{
   console.log(`server in port ${app.get('port')}`); 
})
