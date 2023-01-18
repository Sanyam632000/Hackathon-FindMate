const mongoose = require("mongoose");


const QuestionSchema = new mongoose.Schema({
    userId:{
        type:String,
    },

    Question:{
        type: String,
    },

    Department_Related_To:{
        type: String,
    },

    Comment:{
        type: String,
    },


    Previous_Comments_Of_Question:{
        type:Array,
    },

    Previous_Comment_Posted_By:{
        type:String,
    },
    
},
{timestamps:true}
)

module.exports = mongoose.model("Question",QuestionSchema);