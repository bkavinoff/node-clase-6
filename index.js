const express = require('express');
const Contenedor = require('./contenedor.js')
const puerto = 8080;
const contenedor = new Contenedor('./productos.txt');

const app = express();
let visitas = 0;

//el use es un middleware, las peticiones primero pasan por acá, y luego se manda a la ruta
app.use( (req, res, next) => {
    visitas++;
    next();
})

app.get('/', (req, res) => {
    res.send('Hola soy home')
})

//si pongo un middleware acá, va a afectar solo a /user por ejemplo

app.get('/user', (req, res) => {
    res.send('Hola soy user')
})

app.get('/visitas', (req, res) => {
    res.send(`El sitio ha recibido ${visitas} visitas.`)
})

app.get('/user/:id/:nombre', (req, res) => {
    const {id, nombre} = req.params;
    res.send(`Hola soy ${nombre} con id: ${id}`)
})

app.get('/productos', (req,res)=>{
    const p = async () => {
         res.send(await contenedor.getAll());
    }

    p();
})

app.get('/productoRandom', (req,res)=>{
    const p = async () => {
        const productsCount = await contenedor.getProductsCount();
        //console.log('productsCount: ', productsCount)
        if (productsCount > 0){
            const randomId = ( Math.floor(Math.random() * productsCount) + 1 )
            //console.log('RandomID: ', randomId)
            res.send(await contenedor.getById(randomId));
        }else{
            res.send('No hay productos cargados')
        }
    }

    p();
})

app.get('/productos/addAll', (req,res)=>{
    const p = async () => {
        await contenedor.save({nombre:'silla', precio:1500})
        await contenedor.save({nombre:'mesa', precio:8000})
        await contenedor.save({nombre:'mantel', precio: 500})
    }

    p();
    res.send('Se han creado los productos')
})


app.listen(puerto, ()=> {
    console.log(`Servidor iniciado en el puerto ${puerto}`)
})