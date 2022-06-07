const http = require("http");
const puerto = 8080;

const server = http.createServer( (req, res) => {
    const tiempo = new Date();
    const hora = tiempo.getHours();

    let mensaje = "";
    console.log(`Llegó una peticion`);
    if (hora >= 0 && hora <= 12)
    {
        mensaje = "Buenos días";
    }else if ( hora >= 13 && hora <= 19 )
    {
        mensaje = "Buenas tardes";
    }else{
        mensaje = "Buenas noches";
    }
    
    res.end(mensaje);
});

server.listen(puerto, () => {
    console.log(`Servidor escuchando puerto ${puerto}`);
})