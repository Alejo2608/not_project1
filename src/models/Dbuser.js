const mongoose = require('mongoose')
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const DbuserSchema = new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    date:{type:Date,default:Date.now}
});

DbuserSchema.methods.encryptPassword=async(password)=>{
    const salt=await bcrypt.genSalt(10);
    const hash=bcrypt.hash(password,salt);
    return hash;
};

DbuserSchema.methods.matchPassword = async function (password) {
    let enc = await this.encryptPassword(this.password);
    return await bcrypt.compare(password, enc);
};

module.exports = mongoose.model('user', DbuserSchema)

