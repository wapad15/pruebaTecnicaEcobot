const rutas = require('express').Router()
const conexion = require('./config/conexion')


/*rutas.get('/' , function(req, res){
    res.send('hola desde rutas/inicio')
});*/


//agregamos las rutas

//ruta para agregar productos
rutas.get('/', (req, res)=>{

    let sql = 'select * from tb_productos';
    conexion.query(sql, (err, rows, fields)=>{
        if(err)throw err;
        else{
            res.json(rows);
        }
    })
});

//seleccionar unproductos
rutas.get('/:id', (req, res)=>{
    const {id} = req.params;
    let sql = 'select * from tb_productos where id = ?';
    conexion.query(sql,[id], (err, rows, fields)=>{
        if(err)throw err;
        else{
            res.json(rows);
        }
    })
});

//agregar producto
rutas.post('/', (req,res)=>{
    //obtenemos las variables que vienen en el body
    const {nombre,categoria,sabor,precio,estado}= req.body
    //creamos la consulta de sql para isertar en la db
    let sql = `insert into tb_productos(nombre,categoria,sabor,precio,estado) 
    values('${nombre}','${categoria}','${sabor}','${precio}','${estado}')`
    //hacemos la  peticion para dar respuesta satisfactoria en formato JSon o de error
    conexion.query(sql, ( err, rows, fields)=>{
        if(err)throw err
        else{
            res.json({status: 'producto agregado'})
        }
    })
})

// actualizar producto
rutas.put('/:id',(req, res)=>{
    const {id}= req.params
    const {nombre,categoria,sabor,precio,estado}= req.body
    let sql = `update tb_productos set
                nombre = '${nombre}',
                categoria = '${categoria}',
                sabor = '${sabor}',
                precio = '${precio}',
                estado = '${estado}' 
                where id = '${id}' `;
                
    conexion.query(sql, ( err, rows, fields)=>{
        if(err)throw err
        else{
            res.json({status: 'producto actualizado'})
        }
    })
});

// eliminar producto
rutas.delete('/:id',(req, res)=>{
    const {id}= req.params
    let sql = `delete from  tb_productos where id = '${id}'`;
    conexion.query(sql, ( err, rows, fields)=>{
        if(err)throw err
        else{
            res.json({status: 'producto elimiando'})
        }
    })
});

module.exports = rutas;