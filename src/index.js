const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const passport = require('passport');
const {database} = require('./keys');
const multer = require('multer');
const cors = require('cors');
require('dotenv').config();

//Inicializaciones
const app = express();
require('./lib/passport');

//configuraciones
app.set('views', path.join(__dirname, 'views')); //Ruta de views
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars'),
}));
app.set('view engine', '.hbs');

//Middlewares
app.use(cors());
app.use(session({
    secret: 'hola',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
const storage = multer.diskStorage({
    destination:path.join(__dirname, 'public/uploads'),
    filename: (req,file,cb)=>{
        cb(null,new Date().getTime() + path.extname(file.originalname));
    }
});
app.use(multer({storage: storage}).single('image'));


//Variables Globales
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next();
})
//Routes
app.use(require('./routes/index'));
app.use(require('./routes/authentication'));
app.use('/semillero', require('./routes/semillero'));
app.use('/links', require('./routes/links'));


//Public
app.use(express.static(path.join(__dirname, '/public'))); //Para configurar archivos publicos como js,css etc

//Iniciar servidor
app.listen(process.env.PORT || 5000, (req, res) => {
    console.log("Servidor listening");
})
