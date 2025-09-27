from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app import crud, schemas, database

router = APIRouter(prefix="/todos", tags=["todos"])

# Todo一覧取得
@router.get("/", response_model=list[schemas.TodoRead])
def read_todos(db: Session = Depends(database.get_db)):
    return crud.list_todos(db)

# Todo作成
@router.post("/", response_model=schemas.TodoRead)
def create_todo(
    todo: schemas.TodoCreate,
    user_id: int = Query(..., description="作成者のUser ID"),
    db: Session = Depends(database.get_db),
):
    # （任意）ユーザー存在チェック
    if not crud.get_user(db, user_id):
        raise HTTPException(status_code=404, detail="User not found")
    return crud.create_todo(db, user_id, todo)  # ← 順番を修正！
