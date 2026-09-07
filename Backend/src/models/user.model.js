const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "name is required for account"],
        trim:true

    },
    mobile:{
        type:String,
        unique:true,
        trim:true

    },
    email:{
        type:String,
        required:[true,"email id required"],
        unique:true
    },
    password:{
        type:String,
        select:false
    },
    profileImage:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },

     isMobileVerified: {
            type: Boolean,
            default: false,
        },

        isEmailVerified: {
            type: Boolean,
            default: false,
        },
},
{timestamps:true}
)


const userModel = mongoose.model("users",userSchema);

module.exports = userModel;