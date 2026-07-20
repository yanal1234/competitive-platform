from fastapi import FastAPI
app=FastAPI()

@app.get("/")
def root():
    return{"message": "AI service is running"}

@app.post("/explain")
def explain(data:dict):
    return{
        "return":data
    }