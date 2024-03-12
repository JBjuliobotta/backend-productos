const express = require('express');
const cors=require('cors');
const morgan=require('morgan');


//primera configuracion: crear una instancia de express
const app=express();    
//configuramos el acceso a las variables de entorno
require('dotenv').config();
//console.log(process.env.PORT);

//se configura el puerto donde se va a ejecutar nuestro servidor backend
app.set('port', process.env.PORT || 9001);


//ponemos a escuchar en un puerto a nuestro backend
app.listen(app.get('port'), ()=>{console.log(`backend productos listening in port ${app.get('port')}`);});
console.log("probando la actualizancion de nodemon");
