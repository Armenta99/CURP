//Requires modules, Instalación de modulos.
const express = require('express');
//Motor de vistas
const ejsLayouts = require('express-ejs-layouts');
//Nombre de la aplicación
const app = express();
const port = process.env.PORT || 8080;

//Motor de vistas EJS
app.set('view engine', 'ejs');
app.use(ejsLayouts);

//uso de bodyParser
app.use(express.urlencoded({extended:true}));

//Cargar modulos de routes
const router = require('./routes/routes');
app.use('/', router);

//Recursos publicos
app.use(express.static('public'));

app.listen(port, () =>{
	console.log("Servidor activo en puerto 8080");
});


