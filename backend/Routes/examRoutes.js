const express = require("express");
const router = express.Router();
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");
const Question = require("../models/questionModel");
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
        let questionCount = await Question.countDocuments();
  
        fs.createReadStream(path)
          .pipe(csv())
          .on("data", async (row) => {
            try {
              const diff = row.Difficulty;
              const topic = "JDBC";
              const questionText = row.Question;
              const answerText = row.Answer;
  
              // Check if the question already exists in the database
              const existingQuestion = await Question.findOne({ question: questionText });
              let id;
  
              if (existingQuestion) {
                // If the question already exists, use its existing id
                id = existingQuestion.id;
              } else {
                // If the question is unique, increment the count and use it as the new id
                id = questionCount + 1;
                questionCount++;
              }
  
              // Create a new Question document using the create() method
              await Question.create({
                id: id,
                subject: language,
                difficulty: diff,
                topic: topic,
                question: questionText,
                answer: answerText,
              });
            } catch (error) {
              console.log("Error saving question:", error);
            }
          })
          .on("end", () => {
            // Remove the temporary CSV file
            fs.unlinkSync(path);
            console.log(language);
            res.status(200).send("File uploaded successfully");
          });
      } catch (error) {
        console.log("Error uploading file:", error);
        res.status(500).send("Error uploading file");
      }
    })
  );
  
router.post("/admin/putQuestion", asyncHandler(async (req, res) => {
    try {
      const {id, difficulty, topic, question, answer } = req.body;
  
      const newQuestion = new Question({
        id:id,
        subject: "java",
        difficulty: difficulty,
        topic: topic,
        question: question,
        answer: answer,
      });
  
      newQuestion.save();
      res.status(201).json(newQuestion);
  
      res.status(200).send("Question uploaded successfully");
    } catch (error) {
      console.log("Error uploading question:", error);
      res.status(500).send("Error uploading question");
    }
  }));
  router.get("/admin/getQuestions", asyncHandler(async (req, res) => {
    try {
      const subject=req.query.subject;
      const questions = await Question.find({ subject: subject});
      res.status(200).json(questions);
    } catch (error) {
      console.log("Error getting questions:",error);
      res.status(500).send("Error getting questions");
    }
  }));
  module.exports = router;
  