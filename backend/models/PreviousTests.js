const mongoose=require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const previousTestSchema=new mongoose.Schema({
    id:Number,
    email:String,
    subject:String,
     score:Number
    
});

const PreviousTest=mongoose.model("PreviousTest",previousTestSchema);
module.exports=PreviousTest;
