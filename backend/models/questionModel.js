const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const questionSchema = new mongoose.Schema({
    id:Number ,
  subject: String,
  difficulty: String,
  topic: String,
  question: String,
  answer: String,
});



const Question = mongoose.model("Question", questionSchema);
module.exports = Question;
