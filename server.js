//require my npm models
let express = require('express');
let bodyParser = require('body-parser');
let session = require('express-session');
let port = 8000;


let app = express();

//set up the middleware
//views
app.set('view engine', 'ejs');
app.set('views', __dirname + "/views");

//static content
app.use(express.static(__dirname + '/static'));

//POST requrest helper
app.use(bodyParser.urlencoded({ extended: true }));
//session
app.use(session({
  secret: 'ladalja;sdlfajlfajsdlasdfafd',
  resave: false,
  saveUninitialized: true,
}))

//routes
app.get('/', (req, res) => {
  let ctx = {
    dojos :[
      {name: 'DC'},
      {name: 'VA'},
      {name: 'MD'},
    ],
    languages : [
      {name: 'Python'},
      {name: 'Java'},
      {name: 'JavaScript'},
    ]
  }
  res.render('index', {ctx})
})

app.post('/result', (req, res) => {
  console.log(req.body)
  ctx = {
    name: req.body.name,
    location: req.body.location,
    language: req.body.language
  }
  return res.render('result', {ctx})
})
//must be at the bottom of the document
app.listen(port, () => console.log(`listening on port ${port}...`))
