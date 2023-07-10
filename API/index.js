const express = require("express");
const mysql = require("mysql");
const bodyparser = require("body-parser");
const bodyParser = require("body-parser");

const app = express();

//Configuraciones de express, métodos permitidos...
app.use(function (req, res, next){
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Methods', "*");
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

//Utilizando el body-parser
app.use(bodyParser.json());

//Configuración de puerto para servidor express
const port = 3000;

//Instancia para conexión a MySQL
const cn = mysql.createConnection({
    host:'localhost',
    database:'CRUD_Angular',
    user:'root',
    password:''
})

//Conexión
app.listen(port, () =>{
    console.log(`Servidor corriendo en el puerto: ${port}`);
})

cn.connect(error => {
    if(error) throw error
    console.log("Conexión exitosa a la base de datos");
})

//Rutas
app.get('/', (req, res)=>{
res.send('API')
})

//Listando todos los usuarios
app.get('/usuarios', (req, res) =>{
    const query = 'SELECT * FROM usuario'
    cn.query(query, (error, resul) =>{
        if(error) return console.error(error.message);

        if(resul.length > 0){
            res.json(resul)
        } else{
            res.json('No hay registros')
        }
    })
})

//Mostrando usuario según id
app.get('/usuarios/:id', (req, res) =>{
    //Requiriendo el id seleccionado en pantalla
    const {id} = req.params;

    //consulta
    const query =`SELECT * FROM usuario WHERE ID=${id}`
    //Enviando consulta a bd
    cn.query(query, (error, resul)=>{
        if(error) return console.error(error.message);

        if(resul.length > 0){
            res.json(resul)
        } else{
            res.json('No hay registros con ese id')
        }
    })
})

//Agregando usuario
app.post('/usuarios/agregar', (req, res) =>{
    //Requiriendo y almacenando datos del formulario
    const usuario ={
        nombre: req.body.nombre,
        email: req.body.email
    }

    const query = `INSERT INTO usuario SET ?`
    cn.query(query, usuario, (error, resul)=>{
        if(error) return console.error(error.message);

        res.json(`Se insertó correctamente el usuario`)
    })
})

//Actualizando usuario
app.put('/usuarios/editar/:id', (req, res) =>{
    //Requiriendo campos para actualización
    const {id} = req.params;
    const {nombre, email} = req.body;

    const query = `UPDATE usuario SET nombre='${nombre}', email='${email}' WHERE id=${id}`
    cn.query(query, (error, resul)=>{
        if(error) return console.error(error.message);
        res.json('Se actualizó el usuario correctamente')
    })
})

//Eliminando usuario
app.delete('/usuarios/borrar/:id', (req, res) =>{
    const {id} = req.params;

    const query = `DELETE FROM usuario WHERE id=${id}`
    cn.query(query, (error, resul)=>{
        if(error) return console.error(error.message);
        res.json('Se eliminó el usuario correctamente')
    })
})