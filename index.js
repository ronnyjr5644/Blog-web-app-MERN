
const path=require('path');

require('dotenv').config({ path: './config.env' });
const express=require('express');

const dotenv=require('dotenv')
dotenv.config({path:'./congig.env'});

const bodyParser=require('body-parser')  //parses the post req coming from the browser and give it to us in req.body

const app=new express();
//const { config, engine } = require('express-edge');

const mongoose=require('mongoose');
//app.set('view engine', 'ejs');
mongoose.connect(process.env.DATABASE,{useNewUrlParser:true,useCreateIndex:true,useFindAndModify:false,useUnifiedTopology: true 
}).then(()=>{

    console.log('DB connection successful');
});




// const testBlog=new Blog({
//     title:'My first blosad',
//     description:'This is my first asdblog',
//     content:'hkshdkdshshskdshaskhdsakhdkshdjsakhdjashdjskadhjksahdkashdkjshdkahdkhkashkdashkdskhdsk'
// })
// testBlog.save().then(doc=>{
//     console.log(doc);
// }).catch(err=>{
//     console.log(err);
// });

const Post=require('./database/models/Post')
app.use(express.static('public'));
 //app.use(expressEdge)
 //app.set('views','${__dirname}/views')

//app.use(expressEdge);     //app.use helps us to add functionality to express
//app.set('views',`${__dirname}/views`); //name and the currdirectory
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.set("view engine","ejs")
app.get('/',async(req,res)=>{
    const posts=await Post.find({});
    console.log(posts)
    res.render("index", {posts});
    //res.sendFile(path.resolve(__dirname,'pages/index.html'),{posts});
    
    //res.render('index',{posts})
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
app.get('/posts',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'pages/create.html'))
})
app.post('/postsstore',(req,res)=>{
    Post.create(req.body,(error,post)=>{
        res.redirect('/')
    })
    // console.log(req.body)
    // res.redirect('/')

})
app.listen(8098,()=>{
    console.log('server started at port 8089');
})