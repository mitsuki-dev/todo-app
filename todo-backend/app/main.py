# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
import app.models  # ★テーブル作成前にモデルを読み込む
from app.routes.users import router as users_router
from app.routes.todos import router as todos_router

app = FastAPI(title="Todo Backend", version="0.1.0")

# --- CORS (フロントから叩けるように) ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- ヘルスチェック用(トップページ) ---
@app.get("/")
def root():
    return {"status": "ok"}

# --- モデルを元にDBテーブル作成 ---
Base.metadata.create_all(bind=engine)

# --- ルーター登録 ---
app.include_router(users_router)
app.include_router(todos_router)
