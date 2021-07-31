const mongoose = require("mongoose");
//Connection URI
const uri = "mongodb+srv://Alejo:PluFor20@cluster1.jrajh.mongodb.net/MyFavULNT?retryWrites=true&w=majority";
//Connection DB
async function database() {
    try {
        await mongoose.connect(uri, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useFindAndModify: true,
            useUnifiedTopology: true
        });
        console.log("Database is online");
    } catch (err) {
        console.error(err);
    };
};

database(); 

// const client = new MongoClient(uri, { useNewUrlParser: true });

// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });