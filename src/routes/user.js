const express = require('express');
const router = express.Router();
const Dbuser = require("../models/Dbuser");
const passport=require("passport")

router.get('/signin', (req, res) => {
    res.render('users/signin');
});

router.post("/newUser", passport.authenticate("local")), {
    successRedirect:"/url",
    failureRedirect:"/users/signup",
    failureFlash:true
}
router.get('/signup', (req, res) => {
    res.render('users/signup');
});

router.post("/newUser", async (req, res) => {
    const { name,email,password }  = req.body;
    const errors = [];
    if(!name) {
        errors.push({text: "Please write a correct name"});
    }
    if(!email){
        errors.push({text:"Please Write a correct email"})
    }
    if(!password){
        errors.push({text:"Please Write a correct password"})
    }
    if (errors.length > 0) {
        res.render("user/newUser", {
            errors,
            name,
            email,
            password
        });

    } else {
        //models - enviar a la db 
        const emailU = await Dbuser.findOne({email:email})
        if (emailU) {
            req.flash("error_msg","This emais is already in use")
            res.redirect("/user/signup")
        }
        const newDbuser = new Dbuser({ name: name, email: email, password: password });
        newDbuser.save()
            .then(result => {
                console.log(result);
            })
            .catch(error => {
                console.log(error);
            });
        newDbuser.passsword =  await newDbuser.encryptPassword(password);
        req.flash("success_msg", "You are registered")
        res.redirect("/url")
    }
});


module.exports = router;