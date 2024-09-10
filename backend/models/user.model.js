import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    //   unique: true,
    //   minlength: 3,
    //   maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role:{
    type:String,
    enum:['student' , 'recruiter'],
    required:true
  },
  profile:{
    bio:{type:String},
    skills:[{type:String}],
    resume:{type:String},
    resumeOriginalName:{type:String},
    company:{type:mongoose.Schema.Types.ObjectId , ref:'Company'}, 
    profilePhoto:{
        type:String,
        default:""
    }
  }
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
},{timestamps:true});

const User = mongoose.model('User', userSchema); 
export default User
