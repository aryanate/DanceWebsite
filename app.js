const express = require('express');
const path = require('path');
const { static } = require('express');
const app= express();
const mongoose = require('mongoose');
const bodyparser=require('body-parser');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});
const port =80;

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    Address: String

  });
const Contact = mongoose.model('Contact', contactSchema);
app.use('/static',express.static('static'));
app.use(express.urlencoded());
app.set('view engine', 'pug')
app.set('views',path.join(__dirname,'views'))
app.get('/',(req,res)=>{
    const rim = {}
    res.status(200).render('home.pug',rim);
})
app.get('/about',(req,res)=>{
    const rim = {}
    res.status(200).render('about.pug',rim);
})
app.get('/contact',(req,res)=>{
    const rim = {}
    res.status(200).render('contact.pug',rim);
})
app.post('/contact',(req,res)=>{
    var myData= new Contact(req.body);
    myData.save().then(()=>{
        res.send('This Data is Saved')
    }).catch(()=>{
        res.status(400).send('Item Was not saved to Database');
    });
   // res.status(200).render('contact.pug');
})
app.listen(port,()=>{
    console.log(`The application is sucessfully started in port ${port}`);
});