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

let peopleRoutes = require('./routes/peoples');

app.use(express.static(path.join(__dirname,'public')));

// let peopleData = require('./controllers/people')
let peopleData = require('./models/peopleData')
let loadData=[];
app.use((req, res, next)=>{
  loadData = []
  peopleData.getall().then(([rows, fieldData]) =>{
    
    rows.forEach(element => {
      let data = {}
      data.imageURL = element.imageURL
      data.name = element.name
      data.about = element.about
      loadData.push(data);
    });
    // console.log(loadData)
    next()
})


})
app.get('/', function (req,res) {
  
  res.render('home', { pageTitle: 'Lab5', heading: 'Welcome to People App', data: loadData, hasData: loadData.length > 0});

});

app.use(peopleRoutes);



app.listen(port, function(){
  console.log("port " + port)
})



