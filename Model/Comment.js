const mongoose = require("mongoose");


const CommentSchema = new mongoose.Schema({
   commenting_to_id:{
       type:String,
   },
   
   comment_from:{
       type: String,
       require:true,
   },

   comment:{
       type: String,
       require:true,
   },
    
},
{timestamps:true}
)

module.exports = mongoose.model("Comment",CommentSchema);