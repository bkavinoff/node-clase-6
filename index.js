const express = require('express');
const puerto = 8080;

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


app.listen(puerto, ()=> {
    console.log(`Servidor iniciado en el puerto ${puerto}`)
})