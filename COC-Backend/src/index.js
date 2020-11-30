const express = require('express');
const app = express();
const morgan = require('morgan')
const bodyParser = require('body-parser');
const path = require('path');

const API_Router = require('./routes/Routes')


//Base de datos
require('./database')
// Configuracion
app.set('port', process.env.PORT || 3000);
// Middlewares
app.use(bodyParser.json());
//BodyParser
app.use(bodyParser.urlencoded({extended: true}))
//Morgan
app.use(morgan('dev'))
// Routes
app.use('/api/', API_Router);

//Estaticos
app.use('/Pictures', express.static(path.resolve('Pictures')))

// Starting the server
app.listen(app.get('port'), () => {

    console.log(`Server on port ${app.get('port')}`);
    console.clear()

});
