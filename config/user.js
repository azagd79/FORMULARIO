
   const bcryptjs = require('bcryptjs');
   const conexion = require('../database/db');
exports.register = (req,res)=>{

       
    const {user,fullname,rol,email,password} =req.body;

     const passwordHash  = bcryptjs.hashSync(password,8);

     conexion.query('INSERT INTO registros SET?',{user,fullname,rol,password:passwordHash,email},(err,result)=>{
        if(err) throw err;
         res.redirect('/login');
     })
};