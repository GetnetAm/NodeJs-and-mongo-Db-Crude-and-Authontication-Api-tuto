
const mongoose =require("mongoose")

const userSchema =mongoose.Schema({
    username:{
        type: String,
        required:[true, "Please and the user"],
    },

    email: {
        type:String,
        required: [true, "Please and the user email address"],
        unique:  [true, "Email address already taken"],

    },

    password:{
        type:String,
        required:[true, "Please add password"]
    },
},{
    timestamps:true,
}


);

module.exports=mongoose.model("User", userSchema);