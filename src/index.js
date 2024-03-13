const express = require('express');
const cors=require('cors');
const morgan=require('morgan');
const path=require('path');


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

//middlewares: configuraciones extras del backend que se ejecutan antes de las rutas
//1-middlewares nativos de express
app.use(express.json());// permite recibir objetos en formato json.
app.use(express.urlencoded({extended:true})); //permite recibir objeto de todo en las peticiones.
//2-middlewares de terceros
app.use(morgan('dev')); // nos proporciona detalles de las peticiones en la terminal.
app.use(cors());//nos permite las peticiones remotas

//cargar archivos estaticos que va a ser el index.html
//console.log(__dirname, "DIRNAME");
app.use(express.static(path.join(__dirname,'../public')));


//creamos una ruta de prueba
/*TIPO DE PETICIONES
1)GET: obtener, pedir, leer.
2)PUT/PATCH: actualizar
3)POST: crear y enviar información desde el cliente al backend
4)DELETE: borrar, eliminar.
*/
//req=request(contienen toda la info de la peticion del cliente al servidor)
//res=response(contiene toda la info de la respuesta del servidor al cliente)
//next indica que continue con la siguiente funcion o middleware
app.get('/test', async(req, res, next)=>{
    try {
        console.log("REQUEST-->", req);
        return res.status(200).json({success:true, message:"API IS ALIVE"});
    } catch (error) {
        console.error(error);
        next(error);
    }
});
