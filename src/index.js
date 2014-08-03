var express = require('express'),
	session = require('express-session'),
	bodyparser = require('body-parser'),
	MySQLStore = require('connect-mysql')({
		session: session
	}),
	app = express();


app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('x-powered-by', false);

app.use( express.static( __dirname + '/public' ) );
app.use( session({
	secret: 'very-secret',
	resave: false,
	saveUninitialized: false,
	store: new MySQLStore({
		config: {
			user: 'dev',
			password: 'dev',
			database: 'node-newsletter'
		}
	})
}) );

// Jade basedir
app.locals.basedir = __dirname + '/views';

app.locals.require = require;

// Post data
app.use(bodyparser.urlencoded({ extended: false }));

// Authentication middleware
app.use(function( req, res, next ){
	if( (!req.session || !req.session.user ) && req.path != '/authentication/login' ) {
		return res.redirect(302,'/authentication/login');
	}
	next();
})

app.use(function( req, res, next ){
	if( req.session && req.session.user ) {
		res.locals.authenticated = true;
		res.locals.user = req.session.user;
	}
	next();
})

var notFound = function() {
	this.status = 404;
	this.render('error/notFound');
}
app.use(function( req, res, next ){
	res.notFound = notFound.bind(res);
	next();
})

require('./controllers')(app);

app.listen( process.env.PORT || 9090 );