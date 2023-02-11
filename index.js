
const path=require('path');
const express=require('express');
//const expressEdge=require('express-edge');
const app=new express();
app.use(express.static('public'));
//app.use(expressEdge);     //app.use helps us to add functionality to express
//app.set('views',`${__dirname}/views`); //name and the currdirectory

app.get('/',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'pages/index.html'));
    //res.render('index')
})
app.get('/about',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'pages/about.html'))
})
app.get('/post',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'pages/post.html'))
})
app.get('/contact',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'pages/contact.html'))
})
app.listen(8090,()=>{
    console.log('server started at port 8089');
})