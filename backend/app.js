const express = require('express');
const app = express();


//capturar el body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// cors
const cors = require('cors');
var corsOptions = {
	origin: '*', // Reemplazar con dominio
	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

//variables de entorno
require('dotenv').config();

// import routes
const authRoutes = require('./routes/route');
const authSolicitud = require('./routes/solicitud');
const authPost = require('./routes/post');
const authImg = require('./routes/img');
const muscle = require('./routes/musculo');
const authExercise = require('./routes/ejercicio');


// route middlewares
app.use('/api/user', authRoutes);
app.use('/api/solicitud', authSolicitud);
app.use('/api/post', authPost);
app.use('/api/img', authImg);
app.use('/api/muscle', muscle);
app.use('/api/exercise', authExercise);

//modo history de vue
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(__dirname + '/public'));

//configurando el puerto para heroku
const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
	console.log(`servidor andando en: ${PORT}`);
});
