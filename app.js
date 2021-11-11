var express = require('express');

var app = express();

// set up handlebars view engine
var handlebars = require('express-handlebars').create({
    defaultLayout:'main'
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

let listOfWorks = [{title: 'This is my Web Production One website', link: 'https://fmundergrad.hunter.cuny.edu/~alpizarj/webproduction/classwork/index.html#project', image: '/img/welcome.gif'},{title:"This is my web production 2 midterm", link:'https://ja5046.github.io/web-production-2/midterm/hearthstone-api.html', image:'img/icon.jpg'},{title:"Here is my medp150 webpage", link:'https://fmundergrad.hunter.cuny.edu/~alpizarj/medp150/index.html', image:'img/Duck.jpg'}]
// if you want to add your work to a partial
// middleware to add list data to context
app.use(function(req, res, next){
	if(!res.locals.partials) res.locals.partials = {};
  // 	res.locals.partials.listOfWorks = listOfWorks;
 	next();
});


let moreInfo = ['Im from New Jersey', 'My favorite video game is League of legends', "I lived in the woods for a whole summer with my friends a few years ago"]

app.get('/', function(req, res) {
  res.render('home');
});

app.get('/about', function(req,res){
	res.render('about', {
		moreInfo: moreInfo
	});
});


app.get('/my-work', function(req, res) {
  res.render('works', {
    works: listOfWorks
  })
})

app.get('/works/:number', function(req, res) {
 let pageIndex = parseInt(req.params.number)
  console.log('page index: ', pageIndex)
  let nextPage = pageIndex + 1< listOfWorks.length ? pageIndex + 1 : false
  console.log('next page: ', nextPage)
  res.render('work', {
    work: listOfWorks[pageIndex],
    nextPage: nextPage
  })
})

// 404 catch-all handler (middleware)
app.use(function(req, res, next){
	res.status(404);
	res.render('404');
});

// 500 error handler (middleware)
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function(){
  console.log( 'Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate.' );
});
