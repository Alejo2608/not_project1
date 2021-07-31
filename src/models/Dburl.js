const mongoose = require('mongoose')
const { Schema } = mongoose;

const DburlSchema = new Schema({
    title:{type:String,required:true},
    url:{type:String,required:true},
    description:{type:String,required:true},
    date:{type:Date,default:Date.now}
});

module.exports = mongoose.model('URL', DburlSchema)

