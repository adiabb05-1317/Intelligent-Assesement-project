# Intelligent Assessment System
---
A comprehensive NLP-driven automated grading system designed to streamline the grading process for educators and enhance the learning experience for students. This system supports both MCQ and paragraph-type questions, utilizing cosine similarity for accurate grading of descriptive answers.

## Demo

![Screenshot 2024-08-02 at 7 10 25 PM](https://github.com/user-attachments/assets/9fe62c3d-e0b5-4740-8ae5-81947666b346)
![Screenshot 2024-08-02 at 7 14 40 PM](https://github.com/user-attachments/assets/2a7b4728-f9f4-43f2-ba31-34b0a4b0cd92)
![Screenshot 2024-08-02 at 7 11 30 PM](https://github.com/user-attachments/assets/37e87a71-a714-4bc9-a845-292de573e6aa)
![Screenshot 2024-08-02 at 7 10 39 PM](https://github.com/user-attachments/assets/aa3f2ba7-fed1-46d8-ba2c-18eae54889bf)

![Screenshot 2024-08-02 at 7 13 24 PM](https://github.com/user-attachments/assets/c885fec3-fa65-47a0-9f4a-0b488958be7e)
![Screenshot 2024-08-02 at 7 14 40 PM](https://github.com/user-attachments/assets/9a0aff8c-fef3-4a19-bc3d-c1be901f88bd)


## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Setup](#setup)
- [Usage](#usage)
- [Project Breakdown](#project-breakdown)
- [Cosine Similarity for NLP Grading](#cosine-similarity-for-nlp-grading)
- [Contributing](#contributing)
- [License](#license)

## Features
- User Authentication: Separate login and registration for students and teachers.
- Teacher Dashboard: Upload question-answer databases.
- Student Dashboard: Take exams and view results.
- Exam Portal: Timed exams with both MCQ and paragraph questions.
- Automated Grading: Accurate grading using cosine similarity for descriptive answers.

## Technologies
- **Frontend:** React.js
- **Backend:** Node.js, Express.js, FastAPI
- **Database:** MongoDB
- **NLP:** Cosine Similarity, Machine Learning Models
- **Additional:** JWT for authentication, Material-UI for design

## Setup
1. Clone the repository:
    ```bash
    git clone https://github.com/adiabb05-1317/Intelligent-Assesement-project.git
    ```
2. Install dependencies:
    ```bash
    cd Intelligent-Assesement-project
    npm install
    cd client
    npm install
    ```
3. Start the server:
    ```bash
    cd ..
    npm run dev
    ```
4. Start the client:
    ```bash
    cd client
    npm start
    ```

## Usage
1. Register as a teacher or student.
2. Teachers can upload question-answer databases via the dashboard.
3. Students can take exams through the exam portal.
4. Automated grading is performed using NLP techniques for descriptive answers.

## Project Breakdown
### 1. Login & Registration Page
   - Create user authentication with separate roles for students and teachers.
   - Technologies: React.js, Node.js, JWT

### 2. Teacher and Student Dashboards
   - Teachers can upload question-answer databases.
   - Students can view available exams and take them.
   - Technologies: React.js, Node.js, MongoDB

### 3. Exam Portal
   - A dedicated portal for students to take exams.
   - Supports both MCQ and paragraph questions with a time limit.
   - Technologies: React.js, Node.js, MongoDB

### 4. Automated Grading System
   - Use cosine similarity for grading descriptive answers.
   - Machine learning models for enhanced grading accuracy.
   - Technologies: FastAPI, NLP Libraries

## Cosine Similarity for NLP Grading
Cosine similarity is used to measure the similarity between two non-zero vectors of an inner product space. This method is particularly effective for grading descriptive answers by comparing the vector representation of the student’s answer with the model answer.

### How It Works
1. Convert the text into vectors using TF-IDF or word embeddings.
2. Compute the cosine of the angle between the two vectors.
3. The cosine similarity score ranges from -1 to 1, with 1 indicating identical texts.

### Example
```python
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Sample answers
model_answer = "The capital of France is Paris."
student_answer = "Paris is the capital of France."

# Vectorize the answers
vectorizer = TfidfVectorizer()
vectors = vectorizer.fit_transform([model_answer, student_answer])

# Calculate cosine similarity
similarity_score = cosine_similarity(vectors[0:1], vectors[1:2])
print(f"Similarity Score: {similarity_score[0][0]}")
