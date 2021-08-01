const router = require("express").Router();
const Dburl = require("../models/Dburl");

router.get("/add", (req, res) => {
    res.render("url/newUrl");
});

router.post("/newUrl", async (req, res) => {
    const { title,url,description }  = req.body;
    const errors = [];
    if(!title) {
        errors.push({text: "Please write a correct title"});
    }
    if(!url) {
        errors.push({text: "Please write a correct url"});
    }
    if(!description){
        errors.push({text:"Please Write a correct description"})
    }
    if (errors.length > 0) {
        res.render("url/newUrl", {
            errors,
            title,
            description
        });

    } else {
        //models - enviar a la db 
        const newDburl = new Dburl({ title: title, url: url, description: description });
        newDburl.save()
            .then(result => {
                console.log(result);
            })
            .catch(error => {
                console.log(error);
            });
        req.flash("success_msg","Url Added")
        res.redirect("/url")
    }
});

router.get("/", async (req, res) => {
    console.log("Get URL's")
    await Dburl.find().sort({date: "desc"})
    .then(docs => {
        const context = {
            url: docs.map(docs => {

                return {
                    title: docs.title,
                    url: docs.url,
                    description: docs.description,
                    _id: docs._id,
                    date: docs.date
                }
            })
        }
        console.log(context)
        res.render("url/allUrl", {url: context.url})
    });
});

router.get("/edit/:_id", async (req, res) => {
    const url = await Dburl.findById(req.params._id)
    .then(docs => {
        return {
            title: docs.title,
            url: docs.url,
            description: docs.description,
            date: docs.date,
            _id: docs._id
        }
    });
    res.render("url/editUrl", {url})
});

router.put("/editUrl/:_id", async (req, res) => {

    const { title, url, description } = req.body;
    console.log(title)
     await Dburl.findByIdAndUpdate(req.params._id,{title: title, url: url, description: description });
     res.redirect("/url")
});

router.delete("/delete/:_id", async (req, res) => {
   await Dburl.findByIdAndDelete(req.params._id);
   res.redirect("/url")
});

module.exports = router;