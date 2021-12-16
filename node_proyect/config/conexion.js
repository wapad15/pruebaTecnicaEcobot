const   mysql = require('mysql');

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'wilderperez13',
    port: 3306,
    database: 'db_productos',
});


conexion.connect((err)=>{
    if(err){
        console.log('error al conectar la db '+err);
    }else{
        console.log('conectado a la db')
    }
})

module.exports =conexion;