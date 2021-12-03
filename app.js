var { engine } = require('express-handlebars');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var questionRouter = require('./routes/question');
var answerRouter = require('./routes/answer');
var loginRouter = require('./routes/login');
var signupRouter = require('./routes/signup');
var write_answerRouter = require('./routes/write_answer');
var add_questionRouter = require('./routes/add_question');
var user_questionsRouter = require('./routes/user_questions');
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

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/question', questionRouter);
app.use('/answer', answerRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/write_answer', write_answerRouter);
app.use('/add_question', add_questionRouter);
app.use('/user_questions', user_questionsRouter);

module.exports = app;
