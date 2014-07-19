var express = require('express'),
	app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('x-powered-by', false);

app.use( express.static( __dirname + '/public' ) );

app.get( '/', function( req, res ) {
	res.render('home/home', {
		title: 'Home'
	});
});

app.listen( process.env.PORT || 9090 );