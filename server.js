const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const solver = require('mathjs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs')
const cors = require('cors');
const mysql = require('mysql');

const formidable = require('formidable');

// var corsOptions = {
//   origin: 'http://example.com',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
// }

// app.use(cors(corsOptions))

// con = mysql.createConnection({
//   host: "localhost",
//   user: "akash",
//   password: "g",
//   database: "MathViz"
// });

// function show_all_users() {
//   con.connect(function(err) {
//     if (err) throw err;
//     con.query("SELECT * FROM user_credentials", function (err, result, fields) {
//       if (err) throw err;
//       console.log("Function show_all_users called.\n"+result);
//     });
//   });
// }


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
  })

app.listen(3000, function () {
  console.log('MathViz running on port 3000!')
})

app.post('/practice', function(req, res) {
  // Your logic and then redirect
  console.log("Practice called!");
  res.redirect('/practice')
});

app.get('/practice', function (req, res) {
  // show_all_users();
  res.render("practice")
})

app.post('/equation', function(req, res) {
  // Your logic and then redirect
  console.log("Equation Called!");
  res.redirect('/equation')
});

app.get('/equation', function (req, res) {
  // show_all_users();
  res.render("equation", {imageUploaded: 0});

});

app.post('/test', function(req, res) {
  // Your logic and then redirect
  console.log("Test Called!");
  res.redirect('/test')
});

app.get('/test', function (req, res) {
  // show_all_users();
  res.render("test")
});

const http = require("http");
const path = require("path");
const fs = require("fs");

const httpServer = http.createServer(app);

const PORT = process.env.PORT || 3000;

httpServer.listen(3001, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// put the HTML file containing your form in a directory named "public" (relative to where this script is located)
app.get("/", express.static(path.join(__dirname, "./views")));

const multer = require("multer");

const handleError = (err, res) => {
  res
    .status(500)
    .contentType("text/plain")
    .end("Oops! Something went wrong!");
};

const upload = multer({
  dest: "./public"
});


app.post(
  "/upload",
  upload.single("file"),
  (req, res) => {
    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, "./public/image.png");

    if (path.extname(req.file.originalname).toLowerCase() === ".png") {
      fs.rename(tempPath, targetPath, err => {
        if (err) return handleError(err, res);

        
        res.render("equation", {imageUploaded: 1})
      });
    } else {
      fs.unlink(tempPath, err => {
        if (err) return handleError(err, res);

        res
          .status(403)
          .contentType("text/plain")
          .end("Only .png files are allowed!");
      });
    }
  }
);

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