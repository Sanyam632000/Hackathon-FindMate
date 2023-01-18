const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true,
        min:5,
        max:50
    },

    FullName:{
        type:String,
        require:true,
    },

    email:{
        type:String,
        require:true,
        unique:true,
        min:8,
    },

    password:{
        type:String,
        require:true,
        min:6,
    },
    
    Department:{
        type:String,
    },

    GraduationDurationFrom:{
        type:Date,
        require:true,
    },

    GraduationDate:{
        type:Date,
        require:true,
    },
    
    Course_Taken_This_Semester:{
        type: Array,
        default:[]
    }


    
},
    {timestamps:true}
)



module.exports = mongoose.model("User",UserSchema);

