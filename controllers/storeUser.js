 const User=require('../database/models/user')

module.exports=(req,res)=>{
    User.create(req.body,(error,user)=>{
        if(error){
            return res.redirect('/authregister')
        }
        res.redirect('/');
    })
}