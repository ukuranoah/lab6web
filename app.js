const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const path = require('path')
const { Router } = require('express')
const moment = require('moment')
const { JSDOM } = require('jsdom');
const { window } = new JSDOM('');
const $ = require('jquery')(window);
const exphbs = require('express-handlebars')
const app = express();


app.engine('hbs', exphbs.engine({
    defaultLayout:'main',
    extname:'.hbs',
    helpers:{
   }
}))

app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/Empl',{
    useNewURLParser:true
}).then(()=>{
    console.log("Connected to Database")
}).catch((err)=>{
    console.log(err)
})
require('./models/contact.model')

var Contacts = mongoose.model('contact')

app.post('/enterContact', (req, res)=>{
    console.log(req.body)
    new Contacts(req.body).save().then(()=>{
        console.log("Saved")
        res.render('view')
    })
})
app.get('/', (req, res)=>{
    res.render('index', {title:"Lab 6 Noah Ukura"})
})
app.get('/view', (req, res)=>{
    res.render('view')
})
app.get('/getData', (req, res)=>{
    Contacts.find().then((contact)=>{
        res.json({contact})
    })
})
app.use(express.static(__dirname+"/views"))
app.listen(3000,()=>{
    console.log('listening on port 3000')
})

