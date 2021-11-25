const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const addSchema = new Schema({ 
 name:{
     type:String,
     required:true,
     unique:true
 },
 type:{
     type:String,
     enum:['IMAGE_AD','VIDEO_AD'],
 },
 content_url:{
     type:String,
     required:true,
 },
 heading:{
     type:String,
     required:true,
     maxlength:30
 },
 primary_text:{
    type:String,
    required:true,
    maxlength:120
 },
 destination_url:{
    type:String,
    required:true
 },
 metadata:{
    type:String,
    required:true
 }},{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

module.exports = mongoose.model("adds", addSchema);