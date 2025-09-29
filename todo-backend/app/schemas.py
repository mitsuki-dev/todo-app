# app/schemas.py
from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field, EmailStr, ConfigDict


# ===== User =====
class UserBase(BaseModel):
    username: str = Field(..., min_length=1, max_length=50)
    email: EmailStr

class UserCreate(UserBase):
    # 受信専用: 平文パスワード（ハッシュ化はサーバ側で）
    password: str = Field(..., min_length=6)

class UserRead(UserBase):
    id: int

    # Pydantic v2: ORMからの変換を有効にする
    model_config = ConfigDict(from_attributes=True)

class Message(BaseModel):
    message: str

# ===== Todo =====
class TodoBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    details: Optional[str] = None
    completed: bool = False

class TodoCreate(TodoBase):
    # 作成時は completed は基本 False のままでOK
    pass

class TodoUpdate(BaseModel):
    # 部分更新用（PATCH/PUT）
    title: Optional[str] = Field(None, min_length=1, max_length=200)
    details: Optional[str] = None
    completed: Optional[bool] = None

class TodoRead(TodoBase):
    id: int
    user_id: int
    createdAt: datetime
    updatedAt: datetime

    model_config = ConfigDict(from_attributes=True)


# ===== 便利な入れ子スキーマ（必要になったら使う用） =====
class UserWithTodos(UserRead):
    todos: List[TodoRead] = []

# ===== Auth（認証用） =====
class LoginRequest(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
