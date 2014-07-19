var express = require('express'),
	session = require('express-session'),
	bodyparser = require('body-parser'),
	app = express();


app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('x-powered-by', false);

app.use( express.static( __dirname + '/public' ) );
app.use( session({
	secret: 'very-secret',
	resave: false,
	saveUninitialized: false
}) );

// Jade basedir
app.locals.basedir = __dirname + '/views';

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
	if( req.session && req.session.user )
		res.locals.authenticated = true;
	next();
})

require('./controllers')(app);

app.get( '/', function( req, res ) {
	res.render('home/home', {
		title: 'Home'
	});
});

app.listen( process.env.PORT || 9090 );