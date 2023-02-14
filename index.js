const path=require('path');

require('dotenv').config({ path: './config.env' });
const express=require('express');

const dotenv=require('dotenv')
dotenv.config({path:'./congig.env'});
const expressSession=require('express-session')

const bodyParser=require('body-parser')  //parses the post req coming from the browser and give it to us in req.body

const app=new express();
//const { config, engine } = require('express-edge');
app.use(expressSession({
    secret: 'secret'
}))
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

//controller
const createPostController=require('./controllers/createPost')
const homePageController=require('./controllers/homePage')
const storePostController=require('./controllers/storePost')
const getPostController=require('./controllers/getPost')
const createUserController=require('./controllers/createUser')
const storeUserController=require('./controllers/storeUser')
const loginController=require('./controllers/login')
const loginUserController=require('./controllers/loginUser')

app.use(express.static('public'));
 //app.use(expressEdge)
 //app.set('views','${__dirname}/views')

//app.use(expressEdge);     //app.use helps us to add functionality to express
//app.set('views',`${__dirname}/views`); //name and the currdirectory
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

const storePost=require('./middleware/storePost')
app.use('/postsstore',storePost)
app.set("view engine","ejs")

app.get('/',homePageController)
app.get('/authlogin',loginController)
app.get('/authregister',createUserController)
app.get('/post/:id',getPostController)
app.get('/posts',createPostController);
app.post('/postsstore',storePostController);
app.post('/userregister',storeUserController);
app.post('/userlogin',loginUserController)



app.listen(3004,()=>{
    console.log('server started at port 3000');
})