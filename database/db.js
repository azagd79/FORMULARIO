const mysql = require('mysql');

const dotenv = require('dotenv').config({path: './env/.env'})
const conexion = mysql.createConnection({
        host: process.env.HOST_DATABASE,
        user: process.env.USER_DATABASE,
        password: process.env.PASSWORD_DATABASE,
        database: process.env.DATABASE
})


conexion.connect((err,result)=>{
     if(err) throw err;

     console.log('se conecto ala base de datos');
})



module.exports = conexion;
