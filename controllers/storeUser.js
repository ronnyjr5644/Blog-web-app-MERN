 const User=require('../database/models/user')

module.exports=(req,res)=>{
    User.create(req.body,(error,user)=>{
        if(error){
            const registrationErrors=Object.keys(error.errors).map(key=>error.errors[key].message)
            req.flash('registrationErrors',registrationErrors)
            req.flash('data',req.body)
          console.log(registrationErrors)

            return res.redirect('/authregister')
        }
        res.redirect('/');
    })
}