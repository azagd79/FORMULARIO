const bcryptjs = require('bcryptjs');
const exp = require('constants');
const expresss = require('express');
const session = require('express-session');
const router = expresss.Router();
  const conexion = require('../database/db')
  const register = require('../config/user');

  

router.use(session({
   secret: 'hola',
   resave: true,
   saveUninitialized: true
}))

router.get('/',(req,res)=>{

   const {logged,usuario} = req.session;
     res.render('index',{
        logged,
        usuario
     });
})

router.get('/login',(req,res)=>{
   res.render('login');
})

router.get('/register',(req,res)=>{
    res.render('register');
 })

////PEDIR DATOS AL FORMULARIO Y AÑADIR ALA BASE DE DATOS
 router.post('/registro',register.register)

///COMPROBAR SI LOS DATOS FORMULARIOS EXISTE
  router.post('/logeado',(req,res)=>{
      const {email,password} = req.body
   
     if(email && password){
         conexion.query('SELECT * FROM registros WHERE email = ?',[email],(err,result)=>{
              if(err) throw err;
              if(result.length == 0 || !(bcryptjs.compareSync(password,result[0].password) || email !== result[0].email)){
                     res.send('escribe bien el correo o contraseña');
              }else{
                      const logeado =  req.session.logged = true;
                      const usuario =  req.session.usuario =result[0].user;        
                  //  res.render('index',{
                  //     logeado,
                  //     usuario                      
                  //  });
                   res.redirect('/');
              }
         })
     }else{
        res.send('no puedes logearte');
     }
      

      
  })

  /////CERAR SESION DE LA WEB
  router.get('/loggout',(req,res)=>{
      req.session.destroy(()=>{
         res.redirect('/');
      })
  })



module.exports = router;