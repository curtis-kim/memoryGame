let express = require('express')
let app = express();
var port = process.env.PORT;
console.log(port)
let bodyParser = require('body-parser');
let path = require('path');
let db = require('./util/database');
const expressHbs = require('express-handlebars');
app.engine(
    'hbs',
    expressHbs({
      layoutsDir: 'views/layouts/',
      defaultLayout: 'main-layout',
      extname: 'hbs'
    })
  );
  app.set('view engine', 'hbs');
  app.set('views', 'views');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) // middleware

// parse application/json
app.use(bodyParser.json()) // middleware

let usersRouter = require('./routes/usersRouters');

app.use(express.static(path.join(__dirname,'public')));


app.get('/', function (req,res) {  
  res.render('home', { pageTitle: 'Individual Assignment', heading: 'Welcome to People App', gameTitle: "Rotation Matrix", gameTitleDetail:"Train your working memory by remembering the pattern of titles"});
});


app.use(usersRouter);



app.listen(port, function(){
  console.log("port " + port)
})



