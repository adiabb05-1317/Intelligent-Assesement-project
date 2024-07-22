from fastapi import FastAPI
from fastapi import Body
from typing import List
from fastapi.middleware.cors import CORSMiddleware
from sentence_transformers import SentenceTransformer, util

app = FastAPI()
origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


model = SentenceTransformer('paraphrase-MiniLM-L6-v2')

@app.post("/score_answers/")
async def score_answers(answers: List[str] = Body(...), correct_answers: List[str] = Body(...)) -> dict:
    scores = []
    for ans, correct in zip(answers, correct_answers):
        emb1 = model.encode(ans, convert_to_tensor=True)
        emb2 = model.encode(correct, convert_to_tensor=True)
        
        cosine_sim = util.pytorch_cos_sim(emb1, emb2)
        scores.append(float(cosine_sim))
    
    # Calculate the total score or any other metric you want.
    if len(scores) == 0:
        total_score = 0
    else:
        total_score = sum(scores) / len(scores)
    
    return {"total_score": total_score}
