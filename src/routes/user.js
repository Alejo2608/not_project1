const express = require('express');
const router = express.Router();
const Dbuser = require("../models/Dbuser");
const passport=require("passport")

router.get('/signin', (req, res) => {
    res.render('users/signin');
});

router.get('/signup', (req, res) => {
    res.render('users/signup');
});

router.post("/newUser", async (req, res) => {
    console.log("newUser")
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
        res.render("users/newUser", {
            errors,
            name,
            email,
            password
        });

    } else {
        //models - enviar a la db 
        console.log("FindOne")
        const emailU = await Dbuser.findOne({ email: email })
        console.log(emailU)
        if (emailU) {
            req.flash("error_msg","This email is already in use")
            res.redirect("/user/signup")
        }
        const newDbuser = new Dbuser({ name: name, email: email, password: password });
        console.log(newDbuser)
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

router.post('/login', 
  passport.authenticate('local', { failureRedirect: '/user/signin' }),
  function(req, res) {
    res.redirect('/url');
  });

module.exports = router;