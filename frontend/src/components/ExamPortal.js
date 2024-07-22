import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBIcon,
  MDBProgress,
} from "mdb-react-ui-kit";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useParams } from "react-router-dom";

const ExamPortal = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState({});
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [questions, setQuestions] = useState([]); // State to store fetched questions
  const [timeRemaining, setTimeRemaining] = useState(900); // 15 minutes in seconds
  const { subject } = useParams(); // Get the subject from URL parameters
  const [correct, setCorrect] = useState([]); // State to store
  const[score,setScore]=useState(0);
  const token = localStorage.getItem("token"); // Get token from localStorage
  const email = jwtDecode(token).email;
 // Function to send answers to the backend for scoring
// ...

const sendAnswersToBackend = async () => {
  // Prepare the list of answered question IDs
  const answeredQuestionIds = Object.keys(answers);

  console.log(answeredQuestionIds)
  try {
    // Send the answered question IDs to the server
    const response = await axios.get("http://localhost:3001/api/questions/admin/getCorrectAnswers", {
      params: {
          answeredQuestionIds: answeredQuestionIds.join(','),
      },

  });
    if (response.status === 200) {
      const data = response.data;
      console.log(data)
      setCorrect(data); // This will contain the correct answers
    } else {
      console.error("Failed to get correct answers");
    }
  } catch (error) {
    console.error("Error in sendAnswersToBackend:", error);
  }
};


const submitScore = async () => {
    try {
        const response = await axios.post("http://localhost:3001/api/questions/admin/submitScore", {
            email: email,
            subject: subject,
            score: score
        });

        if (response.status === 201) {
            console.log("Test submitted successfully:", response.data);
            return response.data;
        } else {
            console.error("Failed to submit test:", response.data);
            return null;
        }
    } catch (error) {
        console.error("Error in submitScore:", error);
        return null;
    }
};

// Example usage:
// await submitScore("user@example.com", "Mathematics", 90);

const sendAnswers = async () => {
  try {
    await sendAnswersToBackend();

    // Extract user's answers from the 'answers' object
    const userAnswers = Object.values(answers);

    // Prepare the request body
    const requestBody = {
      answers: userAnswers,
      correct_answers: correct  // Assuming 'correct' is an array of correct answers
    };
    console.log(requestBody)

    // Send the request to the backend
    const response = await axios.post("http://localhost:8000/score_answers/", requestBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      const data = response.data;
      setScore(data.total_score*100);
      submitScore();
      console.log("Score from server:", data.total_score);
    } else {
      throw new Error("Failed to get score from server");
    }
  } catch (error) {
    console.error("Error in sendAnswers:", error);
  }
};

// ...

  // Function to fetch questions for the subject
  const fetchQuestions = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/questions/admin/getQuestions?subject=${subject}`
      );
      const data = await response.json();
      setQuestions(data);
      console.log(data)
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    // Fetch questions when the component mounts
    fetchQuestions();
  }, [subject]);

  // Function to handle the timer
  useEffect(() => {
    let interval;
    if (!testSubmitted && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [testSubmitted, timeRemaining]);

  // Function to handle moving to the next question
  const handleNextQuestion = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  };

  // Function to handle moving to the previous question
  const handlePreviousQuestion = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion - 1);
  };

  // Function to handle answer changes
  const handleAnswerChange = (e) => {
    const { value } = e.target;
    setAnswers({ ...answers, [currentQuestion]: value });
  };

  // Function to handle test submission
  const handleSubmitTest = () => {
    sendAnswers();
    setTestSubmitted(true);
  };

  // Function to calculate the total score
  

  // Function to format the time remaining in MM:SS format
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Function to get difficulty level color
  const getDifficultyColor = (difficulty) => {
    if (typeof difficulty === "string") {
      switch (difficulty.toLowerCase()) {
        case "easy":
          return "green";
        case "medium":
          return "orange";
        case "hard":
          return "red";
        default:
          return "black";
      }
    }
    // Return a default color if difficulty is not a string or is not recognized
    return "black";
  };

  return (
    <MDBContainer fluid className="py-5 bg-light">
      <MDBCard className="mx-auto" style={{ maxWidth: "700px" }}>
        <MDBCardBody className="text-center">
          <MDBCardTitle className="mb-4" style={{ fontSize: "24px" }}>
            <strong>Test Portal</strong>
          </MDBCardTitle>
          {!testSubmitted ? (
            <>
              <MDBCardText className="mb-3" style={{ fontSize: "18px" }}>
                <strong>Question {currentQuestion} of 30</strong>
              </MDBCardText>
              <MDBCardText
                style={{
                  fontFamily: "Arial",
                  fontSize: "20px",
                  marginBottom: "20px",
                }}
              >
                {questions.length > 0 &&
                  questions[currentQuestion - 1].question}
              </MDBCardText>
              <MDBCardText
                className="mb-4"
                style={{
                  color: getDifficultyColor(
                    questions.length > 0 &&
                      questions[currentQuestion - 1].difficulty
                  ),
                }}
              >
                <span style={{ marginRight: "10px", fontSize: "10px" }}>
                  &#8226;
                </span>
                {questions.length > 0 &&
                  questions[currentQuestion - 1].difficulty}
              </MDBCardText>
              <div className="d-flex justify-content-center mb-4">
                <MDBIcon icon="microphone" size="3x" className="text-primary" />
              </div>

              <textarea
                className="form-control mb-4"
                rows={4}
                name={`question${currentQuestion}_answer`}
                value={answers[currentQuestion] || ""}
                onChange={handleAnswerChange}
                placeholder="Speak your answer here..."
              />

              <div className="d-flex justify-content-between my-4">
                <MDBBtn
                  color="primary"
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestion === 1}
                >
                  <MDBIcon icon="angle-double-left" className="me-2" />
                  Previous
                </MDBBtn>
                <MDBBtn
                  color="primary"
                  onClick={handleNextQuestion}
                  disabled={currentQuestion === 30}
                >
                  Next
                  <MDBIcon icon="angle-double-right" className="ms-2" />
                </MDBBtn>
              </div>
            </>
          ) : (
            <>
            <MDBCardText className="mb-4" style={{ fontSize: "18px" }}>
                Test Submitted!
            </MDBCardText>
        
            <MDBCardText className="mb-4" style={{ fontSize: "18px" }}>
                Your Score: {score.toFixed(2)}%
            </MDBCardText>
        
            <MDBProgress className="my-4" value={score} />
            
            <MDBBtn color="primary" onClick={() => setTestSubmitted(false)}>
                Retake Test
            </MDBBtn>
        </>
          )}

          <div className="d-flex justify-content-between align-items-center mt-4">
            <div className="text-muted">
              Time Remaining: {formatTime(timeRemaining)}
            </div>
            {!testSubmitted && (
              <MDBBtn color="danger" onClick={handleSubmitTest}>
                Submit Test
              </MDBBtn>
            )}
          </div>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default ExamPortal;
