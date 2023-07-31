import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn, MDBIcon, MDBProgress } from 'mdb-react-ui-kit';
import { useParams } from 'react-router-dom';

const ExamPortal = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState({});
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [questions, setQuestions] = useState([]); // State to store fetched questions
  const [timeRemaining, setTimeRemaining] = useState(900); // 15 minutes in seconds
  const { subject } = useParams(); // Get the subject from URL parameters

  // Function to fetch questions for the subject
  const fetchQuestions = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/questions/admin/getQuestions?subject=${subject}`);
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error('Error fetching questions:', error);
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
    setTestSubmitted(true);
  };

  // Function to calculate the total score
  const calculateTotalScore = () => {
   
    const answeredQuestions = Object.keys(answers);
    const totalQuestions = answeredQuestions.length;
    const totalScore = answeredQuestions.reduce((score, questionNumber) => score + getQuestionScore(questionNumber), 0);
    return Math.round((totalScore / (totalQuestions * 100)) * 100);
  };

  // Function to get the score for a specific question
  const getQuestionScore = (questionNumber) => {
   
    const score = Math.floor(Math.random() * 100);
    return score;
  };

  // Function to format the time remaining in MM:SS format
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Function to get difficulty level color
  const getDifficultyColor = (difficulty) => {
    if (typeof difficulty === 'string') {
      switch (difficulty.toLowerCase()) {
        case 'easy':
          return 'green';
        case 'medium':
          return 'orange';
        case 'hard':
          return 'red';
        default:
          return 'black';
      }
    }
    // Return a default color if difficulty is not a string or is not recognized
    return 'black';
  };
  

  return (
    <MDBContainer fluid className="py-4">
      <MDBCard>
        <MDBCardBody>
          <MDBCardTitle>Test Portal</MDBCardTitle>
          {!testSubmitted ? (
            <>
              <MDBCardText>
                Question {currentQuestion} of 30
              </MDBCardText>
              <MDBCardText style={{ fontFamily: 'Arial', fontSize: '25px', marginBottom: '5px' }}>
                {/* Display the question here */}
                {questions.length > 0 && questions[currentQuestion - 1].question}
              </MDBCardText>
              <MDBCardText style={{ color: getDifficultyColor(questions.length > 0 && questions[currentQuestion - 1].difficulty) }}>
                {/* Display difficulty level with colored dot */}
                <span style={{ marginRight: '5px', fontSize: '10px' }}>&#8226;</span>
                {questions.length > 0 && questions[currentQuestion - 1].difficulty}
              </MDBCardText>
              <div className="d-flex justify-content-center mb-3">
                <MDBIcon icon="microphone" size="3x" />
              </div>

              <textarea
                className="form-control mb-3"
                rows={4}
                name={`question${currentQuestion}_answer`}
                value={answers[currentQuestion] || ''}
                onChange={handleAnswerChange}
                placeholder="Speak your answer"
              />

              <div className="d-flex justify-content-between my-3">
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
              <MDBCardText>
                Test Submitted!
              </MDBCardText>

              <MDBCardText>
                Your Score: {calculateTotalScore()}%
              </MDBCardText>

              <MDBProgress className="my-3" value={calculateTotalScore()} />

              <MDBBtn
                color="primary"
                onClick={() => setTestSubmitted(false)}
              >
                Retake Test
              </MDBBtn>
            </>
          )}

          <div className="d-flex justify-content-between align-items-center mt-3">
            <div>
              Time Remaining: {formatTime(timeRemaining)}
            </div>
            {!testSubmitted && (
              <MDBBtn
                color="primary"
                className="mt-3"
                onClick={handleSubmitTest}
              >
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
