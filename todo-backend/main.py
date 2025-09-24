from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",  # ←追加
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/todo")
def read_todo():
    return [
        {"id": 1, "title": "Sample Task", "completed": False},
        {"id": 2, "title": "Write code", "completed": False},
    ]
