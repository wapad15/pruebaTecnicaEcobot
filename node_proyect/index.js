require('./config/conexion')


const express = require('express');

const port = (process.env.port || 3000);

const app = express();


//configuracion del puerto
app.set('port', port)

// tipo de boddy admitidos
app.use(express.json())

//rutas
app.use('/api', require('./rutas'))

//express init
app.listen(app.get('port'),(error)=>{
    if(error){
        console.log('error al iniciar server')+error;
    }else{
        console.log('server init en pueto:'+port);
    }
})