import React, { useState } from 'react';
import { MDBContainer, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn, MDBIcon, MDBProgress } from 'mdb-react-ui-kit';

const ExamPortal = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState({});
  const [testSubmitted, setTestSubmitted] = useState(false);

  const handleNextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestion(currentQuestion - 1);
  };

  const handleAnswerChange = (e) => {
    const { value } = e.target;
    setAnswers({ ...answers, [currentQuestion]: value });
  };

  const handleSubmitTest = () => {
    setTestSubmitted(true);
    // Calculate the score and perform any necessary actions
  };

  const getQuestionScore = (questionNumber) => {
    // Calculate the score for the given question
    // This is just a sample implementation
    const score = Math.floor(Math.random() * 100);
    return score;
  };

  const getQuestionLevel = (questionNumber) => {
    // Determine the level for the given question
    // This is just a sample implementation
    const levels = ['easy', 'medium', 'hard'];
    const randomIndex = Math.floor(Math.random() * levels.length);
    return levels[randomIndex];
  };

  const calculateTotalScore = () => {
    // Calculate the total score based on the answered questions
    // This is just a sample implementation
    const answeredQuestions = Object.keys(answers);
    const totalQuestions = answeredQuestions.length;
    const totalScore = answeredQuestions.reduce((score, questionNumber) => score + getQuestionScore(questionNumber), 0);
    return Math.round((totalScore / (totalQuestions * 100)) * 100);
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
              <MDBCardText>
                {/* Display the question here */}
                Sample Question {currentQuestion}
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

          
            <MDBBtn
              color="primary"
              className="mt-3"
              onClick={handleSubmitTest} 
            >
              Submit Test
            </MDBBtn>
          
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default ExamPortal;
