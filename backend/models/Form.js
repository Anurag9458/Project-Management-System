const mongoose=require("mongoose");

const FormSchema=new mongoose.Schema({


    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    project_name:{
        type:String,
        required:true
    },
    project_des:{
        type:String,
        required:true
    },
    roles:{
        type:Array,
        required:true
    },
    url:{
        type:String,
        required:true
    },
    phase:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    }

})

module.exports=mongoose.model('form',FormSchema);