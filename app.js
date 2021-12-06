var { engine } = require('express-handlebars');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var text_analyticsRouter = require('./routes/text_analytics');
var questionRouter = require('./routes/question');
var answerRouter = require('./routes/answer');
var loginRouter = require('./routes/login');
var signupRouter = require('./routes/signup');
var write_answerRouter = require('./routes/write_answer');
var add_questionRouter = require('./routes/add_question');
var user_questionsRouter = require('./routes/user_questions');
var statusRouter = require('./routes/status');
var aboutRouter = require('./routes/about');
var app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set("views", "./views");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.use('/', questionRouter);
app.use('/text_analytics', text_analyticsRouter);
app.use('/question', questionRouter);
app.use('/answer', answerRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/write_answer', write_answerRouter);
app.use('/add_question', add_questionRouter);
app.use('/user_questions', user_questionsRouter);
app.use('/status', statusRouter);
app.use('/about', aboutRouter);

module.exports = app;
