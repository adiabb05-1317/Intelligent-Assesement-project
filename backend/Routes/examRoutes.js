const express = require("express");
const router = express.Router();
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");
const Question = require("../models/questionModel");
const PreviousResult=require("../models/PreviousTests");
const asyncHandler = require("express-async-handler");

// Multer configuration for file upload
const upload = multer({ dest: "temp/csv" });
router.post(
  "/admin/addQuestions",
  upload.single("myfile"),
  asyncHandler(async (req, res) => {
    try {
      const { language } = req.query;
      const { path } = req.file;

      // Get the current count of documents in the Question collection
      const questionCount = await Question.countDocuments();

      const stream = fs.createReadStream(path);

      stream.pipe(csv())
        .on("data", async (row) => {
          try {
            const diff = row.Difficulty;
            const topic = "JDBC";
            const questionText = row.Question;
            const answerText = row.Answer;

            // Check if the question already exists in the database
            const existingQuestion = await Question.findOne({
              question: questionText,
            });

            if (existingQuestion) {
              console.log("Question already exists:", questionText);
            } else {
              // Create a new Question document using the create() method
              const newQuestion = new Question({
                id: questionCount + 1,
                subject: language,
                difficulty: diff,
                topic: topic,
                question: questionText,
                answer: answerText,
              });

              await newQuestion.save();
              console.log("Question saved:", questionText);
            }
          } catch (error) {
            console.error("Error saving question:", error);
          }
        })
        .on("end", () => {
          // Remove the temporary CSV file
          fs.unlinkSync(path);
          console.log(language);
          res.status(200).send("File uploaded successfully");
        });
    } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).send("Error uploading file");
    }
  })
);

router.get("/admin/getCorrectAnswers", asyncHandler(async (req, res) => {
  try {
      const answeredQuestionIdsStr = req.query.answeredQuestionIds;

      if (!answeredQuestionIdsStr) {
          return res.status(400).send("No answeredQuestionIds provided");
      }

      const idStrings = answeredQuestionIdsStr.split(',');

      // Convert each ID string to a number
      const ids = idStrings.map(Number);

      // Validate each ID to ensure it's a number
      for (let id of ids) {
          if (isNaN(id)) {
              return res.status(400).send(`Invalid id: ${id}`);
          }
      }

      const correctAnswers = await Question.find(
          {
              id: { $in: ids },
          },
          "answer"
      );

      const answers = correctAnswers.map((q) => q.answer);

      res.status(200).json(answers);
  } catch (error) {
      console.error("Error fetching correct answers:", error);
      res.status(500).send("Error fetching correct answers");
  }
}));


router.post(
  "/admin/putQuestion",
  asyncHandler(async (req, res) => {
    try {
      const { id, difficulty, topic, question, answer } = req.body;

      const newQuestion = new Question({
        id: id,
        subject: "java",
        difficulty: difficulty,
        topic: topic,
        question: question,
        answer: answer,
      });

      await newQuestion.save();
      res.status(201).json(newQuestion);

      console.log("Question uploaded successfully");
    } catch (error) {
      console.error("Error uploading question:", error);
      res.status(500).send("Error uploading question");
    }
  })
);

router.get(
  "/admin/getQuestions",
  asyncHandler(async (req, res) => {
    try {
      const subject = req.query.subject;
      const questions = await Question.find({ subject: subject });
      res.status(200).json(questions);
    } catch (error) {
      console.error("Error getting questions:", error);
      res.status(500).send("Error getting questions");
    }
  })
);
router.post("/admin/submitScore", asyncHandler(async (req, res) => {
  try {
      const { email, score, subject } = req.body;
      
      const newResult = new PreviousResult({
          email,
          score,
          subject
      });

      await newResult.save(); // This will save the data to the database

      res.status(201).json("Test submitted successfully");
  } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error", error: err.message });
  }
}));
router.get("/admin/getPreviousResults", asyncHandler(async (req, res)=>{
  try{
       const {email}=req.query;
        const results=await PreviousResult.find({email:email});
        res.status(200).json(results);
        
  }
  catch(err){
    console.log(err)
  }
}));

module.exports = router;
