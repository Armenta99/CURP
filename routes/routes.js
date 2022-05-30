const { Console } = require('console');
const express = require('express');
const path = require('path');
const router = express.Router();
module.exports = router;




router.get('/', (req, res) =>{
    res.render('pages/home');
});



router.get('/about', (req, res) =>{

res.render('pages/about');
});


router.get('/contact', (req, res) =>{
    res.render('pages/contact');
});

router.get('/gracias', (req, res) =>{
    res.render('pages/gracias');
});

router.get('/rfc', (req, res) =>{
    res.render('pages/rfc');
});


//OBTENCIÓN DE LA RFC
router.post('/Home',(req,res)=>{

//OBTENER RFC

//Obtención de datos para la CURP
var Nombre = req.body.nombre;
var App = req.body.App;
var Apm = req.body.Apm;


//Obtener fechas
//Acomodar fechas en Cadena para ser colocada con dos digitos en RFC

var fec = new Date(req.body.fecha);
var Anio = fec.getFullYear();

//Conversión de meses en string
var Mes = "0";
if((fec.getMonth() + 1) >9)  
    Mes = (fec.getMonth()+1).toString();
else
    Mes = "0" + (fec.getMonth()+1).toString(); 

//Conversión de dias en string
 var Dia = "0";
if((fec.getDate() + 1) >9)
    Dia = (fec.getDate()+1).toString();
else
    Dia = "0" + (fec.getDate()+1).toString(); 
    

//Expresión regular para encontrar la primera o segunda vocal del apellido paterno.
//Creo dos arreglos para pasar recorrer el apellido y no tomar en cuenta la primera letra.
var CarRec = App.split("");
var array1 = App.split("");
//Recorremos los caracteres.
for(var i=1; i < App.length; i++)
    CarRec[(i-1)] = array1[i];

//Colocamos los caracteres recorridos en una string.
var Vocales = CarRec.join('');

//Usamos una expresión regular que guarde todas las vocales.
var expresion = /[aeiouAEIOU]/gi;
var arrVoc = Vocales.match(expresion);


//Convierto los datos en arreglos.
var arrNombre = Nombre.split("");
var arrAnio = Anio.toString().split("");
var arrApp = App.toString().split("");
var arrApm = Apm.split("");


//Variables para generar caracteres aleatorios.
var caracteres = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
var numeros = [0,1,2,3,4,5,6,7,8,9];

//Funciones para generar caracteres al azar.
function carRand(nRand) {
    return caracteres[nRand];
  }
 
//Funcion para generar digito al azar.
function numRand(nRand) {
    return numeros[nRand];
  }

//Juntar todos los caracteres necesarios para formar el RFC.
var RFC = [arrApp[0].toUpperCase(),arrVoc[0].toUpperCase(),arrApm[0].toUpperCase(),arrNombre[0].toUpperCase(),arrAnio[2],arrAnio[3],Mes,Dia,caracteres[Math.floor(Math.random() * 27)],numeros[Math.floor(Math.random() * 10)],caracteres[Math.floor(Math.random() * 27)]].join('');


//Exprisión regular para encontrar palabras altisonantes dentro del RFC formado.
const pattern = /PENE/ ;
//Si encuentra una palabra altisonante entonces cambia el segundo caracter por una X.
if(pattern.test(RFC))
{
var temp= RFC;
arrTemp = temp.split("");
arrTemp[1] = "X";
RFC = arrTemp.join('');
}

//Envio del nombre y RFC a la página.
    res.render('pages/rfc',{name : req.body.nombre,  impRFC: RFC});
    
    });


 router.post('/contact',(req,res)=>{

        console.log(req.body.nombre);
        console.log(req.body.correo);
        console.log(req.body.mensaje);
    
   
        res.render('pages/gracias',{name : req.body.nombre, email: req.body.correo, message: req.body.mensaje});
    
        });