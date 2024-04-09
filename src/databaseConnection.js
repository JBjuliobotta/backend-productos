const mongoose=require('mongoose');

const databaseConnection=()=>{
    const connectionString=process.env.DDBB;
    //console.log("valor de la variable de entorno", connectionString);

    mongoose.connect(connectionString);

    const connection=mongoose.connection;

    connection.once("open", ()=>{
        console.log("DDBB CONNECT SUCCESSUL");
    });
};

module.exports=databaseConnection;
