import mongoose from "mongoose";

const operatorSchema = new mongoose.Schema({
  shopname:{
    type:String,
    required:true,
    trim:true,
  },
  ownername:{
    type: String,
    required: [true,'Ownername is required'],
  },
  phone:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  password:{
    type:String,
    required:true,
  },
  
  // address:{
  //   type:String,
  //   required:true
  // },
  role:{
    type:Number,
    default:0,
  }

},{timestamps:true});

export default mongoose.model('operators',operatorSchema )
