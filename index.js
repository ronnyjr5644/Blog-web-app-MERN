const path=require('path');

require('dotenv').config({ path: './config.env' });
const express=require('express');
const edge=require('edge.js')
const dotenv=require('dotenv')
dotenv.config({path:'./congig.env'});
const multer=require('multer')
const expressSession=require('express-session')
const connectMongo=require('connect-mongo')
const bodyParser=require('body-parser')  //parses the post req coming from the browser and give it to us in req.body
const compression=require('compression')
const mongoose=require('mongoose');
const app=new express();
const upload=multer({dest: 'public/img'})
const connectFlash=require('connect-flash');



app.use(expressSession({
  secret: 'secret',
  
}));
mongoose.connect(process.env.DATABASE,{useNewUrlParser:true,useCreateIndex:true,useFindAndModify:false,useUnifiedTopology: true 
}).then(()=>{

    console.log('DB connection successful');
});

app.use(connectFlash())

//app.set('view engine', 'ejs');
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
const logoutController=require('./controllers/logout')

app.use(express.static('public'));
 //app.use(expressEdge)
 //app.set('views','${__dirname}/views')

//app.use(expressEdge);     //app.use helps us to add functionality to express
//app.set('views',`${__dirname}/views`); //name and the currdirectory
app.use('*', (req, res, next) => {
  app.locals.auth = req.session.userId
  next();
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

const storePost=require('./middleware/storePost')
const auth=require("./middleware/auth");
const redirectifAuthenticated=require("./middleware/redirectifAuthenticated")
app.use(compression())
// app.use('/postsstore',storePost)
// app.use('/posts',auth)
app.set("view engine","ejs")
app.get('/',homePageController)
app.get('/authlogin',redirectifAuthenticated,loginController)
app.get('/authregister',redirectifAuthenticated,createUserController)
app.get('/authlogout',auth,logoutController)
app.get('/post/:id',getPostController)
app.get('/posts',auth,createPostController);
app.post('/postsstore',auth,storePost,storePostController);
app.post('/userregister',redirectifAuthenticated,storeUserController);
app.post('/userlogin',redirectifAuthenticated,loginUserController)

app.use((req,res)=>{
    res.render('not-found')
})




app.listen(process.env.PORT,()=>{
    console.log(`App listening on port ${process.env.PORT}`);
})