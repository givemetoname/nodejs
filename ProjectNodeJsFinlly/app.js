const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
//const db = require('./config/db')
const morgan = require('morgan')
const methodOverride = require('method-override')
const route = require('./routers');
const passport = require('passport')
const cookieSession = require('cookie-session')
const expressLayouts = require('express-ejs-layouts')
//const MongoStore = require('connect-mongo')(session)
const flash = require('connect-flash')



//db.connect()

// Load config
dotenv.config({path:'./config/config.env'})
//passport config
//require('./config/passport')(passport)

const app = express()

//Body parser
app.use(express.urlencoded({extended:false}))
app.use(express.json())

// Method override
app.use(
    methodOverride(function (req, res) {
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        let method = req.body._method 
        delete req.body._method
        return method
      }
    })
  )
  
//loggin
if(process.env.NODE_ENV === 'development'){
        app.use(morgan('dev'))
}

//Handlebars Helper
//const {formatDate,stripTags,truncate, editIcon,select,likedd,indexOfliked} = require('./helpers/hbs')



//handlebars
// app.engine(
//     'ejs',
//     engine({
//         extname: '.ejs',  
//         helpers: {formatDate,stripTags,truncate,editIcon,likedd,select,sum:(a,b)=>a+b,indexOfliked},
//         defaultLayout: 'main',
//     }),
// );
//session
app.use(cookieSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
   // store: new MongoStore({mongooseConnection: mongoose.connection})
  }))

  

//passport middleware
app.use(passport.initialize())
app.use(passport.session())

//connect flash 
app.use(flash())

//set global var
app.use(function(req, res, next){
    res.locals.user = req.user||null
    next()
})

//Static folder
app.use(express.static(path.join(__dirname, 'sass')))
app.use(expressLayouts)
app.set('view engine', 'ejs')
//router
route(app)

const PORT = process.env.PORT|| 4000


app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
