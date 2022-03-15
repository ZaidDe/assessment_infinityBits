require('dotenv').config()
const createError = require('http-errors')
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const { format } = require('date-fns')

const app = express();


// morgan setup
morgan.token('date', (req, res) => {
    return format(new Date, 'yyyy-MM-dd HH:mm:ss')
})

morgan.format('myformat', '[:date] :method :url :status :res[content-length] - :response-time ms');


//express middlewares 
app.use(morgan('myformat'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors({ origin: "*" }));

//database
const db = require('./database')

//custom routes
const authRouter = require('./routes/auth.routes')
const articleRouter = require('./routes/article.routes')

app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        messge: 'Ok From demo API'
    })
})

app.use('/auth', authRouter)
app.use('/articles', articleRouter)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500).json({
        sucees: false,
        message: 'Something wnt wrong'
    });

});


module.exports = app;




