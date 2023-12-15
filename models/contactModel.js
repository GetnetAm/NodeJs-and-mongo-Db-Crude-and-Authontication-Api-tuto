
const mongoose =require("mongoose");

const contactSchema =mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add the contact name"],
    },

    email:{
        type: String,
        required: [true, "Please enter email"],

    },

    phone: {
        type: String,
        required: [true, "please enter phone number"]
    }
})


module.exports= mongoose.model("Contatct", contactSchema);