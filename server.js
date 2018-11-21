const express = require('express')
const app = express()
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs')
const cors = require('cors');
const mysql = require('mysql');

var corsOptions = {
  origin: 'http://example.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}

app.use(cors(corsOptions))

con = mysql.createConnection({
  host: "localhost",
  user: "akash",
  password: "g",
  database: "MathViz"
});

function show_all_users() {
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM user_credentials", function (err, result, fields) {
      if (err) throw err;
      console.log("Function show_all_users called.\n"+result);
    });
  });
}


function add_user(username, password) {
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO user_credentials (username, password) VALUES ('"+username+"', '"+password+"')";
    con.query(sql, function(err, result) {
    // con.query("INSERT INTO user_creds (Host,Db,User,Select_priv,Insert_priv,Update_priv,Delete_priv,Create_priv,Drop_priv) VALUES ('%','db','user','Y','Y','Y','Y','Y','N');", function (err, result) {
      if (err) throw err;
      console.log("Added "+username+" to the database.");
    });
  });
}

vision_api_key = "************************************";


app.get('/', function (req, res) {
  // show_all_users();
  res.render("index")
})

app.post('/', function (req, res) {
    res.render('index');
    console.log.apply(req.body.city);
  })

app.listen(3000, function () {
  console.log('MathViz running on port 3000!')
})

app.route('/api/cats/:name').get((req, res) => {
  const requestedCatName = req.params['name'];
  res.send({ name: requestedCatName });
});

app.route('/api/cats').post((req, res) => {
  res.send(201, req.body);
});

/*let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
*/