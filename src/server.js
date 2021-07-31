const express=require("express");
const path=require("path");
const exphdl=require("express-handlebars")
const method=require("method-override")
const session=require("express-session")
const flash=require("connect-flash")
const passport=require("passport")
//Inicializacion
const server=express();
require("./database")
require("./config/passport")
//Settings
const port =3000;

server.set("views", path.join(__dirname,"views"));
server.engine(".hbs",exphdl({
    defaultLayout: "main" ,
    layoutsDir:path.join(server.get("views"),("layouts")) ,
    partialsDir:path.join(server.get("views"),("partials")) ,
    extname:".hbs"
}));
server.set("view engine",".hbs")
//Middlewares
server.use(express.urlencoded({
    extended: false
}));
server.use(method("_method"))
server.use(session({
    secret:"PluFor",
    resave:true,
    saveUninitialized:true
}));
server.use(passport.initialize());
server.use(passport.session());
server.use(flash())
//Variables G
server.use((req,res,next)=>{
    res.locals.success_msg=req.flash("success_msg")
    res.locals.error_msg=req.flash("error_msg")
    res.locals.error=req.flash("error")
    next()
})
//Rutas
routeUser = require("./routes/user")
routeURL = require("./routes/url")
routeServer = require("./routes/server")

server.use("/user", routeUser)
server.use("/url", routeURL)
server.use("/", routeServer)

//Archivos estaticos
server.use(express.static(path.join(__dirname,"public")))
//Server activo
server.listen(port, () => console.log("Server is Online, in port ", port));