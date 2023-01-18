const mongoose = require("mongoose");


const MarketSchema = new mongoose.Schema({

    Department:{
        type:String,
    },

    PostedBy:{
        type:String,
    },

    Description:{
        type:String,
    },

    Price:{
        type: Number,
    },

    Item_Image:{
        type:String,
    },
    
    Post_Heading:{
        type: String,
    },
    
},
{timestamps:true}
)

module.exports = mongoose.model("Market",MarketSchema);