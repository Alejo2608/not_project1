const passport=require("passport");
const LocalStrategy=require("passport-local").Strategy;
const Dbuser= require("../models/Dbuser")

passport.use(new LocalStrategy({
    usernameField:"email"
}, async (email,password,done)=>{
    const user = await Dbuser.findOne({ email: email });
    console.log(user)
    if(!user){
        return done(null,false,{message:"Not user found"})
    }else{
        const match = await user.matchPassword(password)
        console.log(match)
        if(match){
            return done(null,user)
        }else{
            return done(null,false,{message:"Incorrect Password"})
        }
    }
}))

passport.serializeUser((user,done)=>{
    done(null,user.id);
})
passport.deserializeUser((id,done)=>{
    Dbuser.findById(id, (err,user)=>{
        done(err,user);
    });
});
