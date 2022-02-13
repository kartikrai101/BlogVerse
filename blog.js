const express = require('express');
const app = express();
const ejsMate = require('ejs-mate');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Kartik@2002',
    database: 'blogverse',
    insecureAuth: true
});

app.set('view engine', 'ejs');
app.engine('ejs', ejsMate);

// we use the app.use function to run middlewares because they always run no matter what was the incoming route of request to our server

app.get('/blogverse', (req, res)=>{
    connection.query('SELECT * FROM blogs', function(error, result){
        if(error){
            throw error;
        } 
        console.log(result[0]); 
        const userInfo = result[0];
        res.render('blogVerse', {userInfo});
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

app.listen(3000, ()=>{
    console.log("listening to port 3000!")
});