const express = require('express');
const app = express();
const ejsMate = require('ejs-mate');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host            :  'localhost',
    user            : 'root',
    password        : 'Kartik@2002',
    database        : 'blogverse',
    insecureAuth    : true
});

app.set('view engine', 'ejs');
app.engine('ejs', ejsMate);

app.use(express.urlencoded({ extended: true }));   // for parsing the data that is incoming from the form of form-data into object that we can use in our code
//app.use(express.json());

// we use the app.use function to run middlewares because they always run no matter what was the incoming route of request to our server

app.get('/blogverse', (req, res)=>{

    const userInfo = 'SELECT * FROM users JOIN blogs ON users.id = blogs.user_id;'
    connection.query(userInfo, function(error, result){
        if(error){
            throw error;
        } 
        //console.log(result[0]); 
        const userinfo = result[0];
        res.render('blogVerse', {userinfo});
    })
});

//the first thing that we need to do is to make the basic crud functionality

app.get('/blogverse/myspace', (req, res)=>{
    res.render('pages/userProfile');
});

app.get('/blogverse/new', (req, res)=>{
    res.render('pages/newBlog');
});


app.get('/blogverse/login', (req, res)=>{
    res.render('pages/login');
});

app.get('/blogverse/signup', (req, res)=>{
    res.render('pages/signup');
});

app.post('/blogverse/signup', (req, res)=>{
    console.log(req.body);
    res.send(req.body);
});

app.listen(3000, ()=>{
    console.log("listening to port 3000!")
});