
from typing import List, Optional
from pydantic import BaseModel

class CommentBase(BaseModel):
    text: str

class CommentCreate(CommentBase):
    author_id: int
    post_id: int

class Comment(CommentBase):
    id: int
    author_id: int
    post_id: int
    likes: int

    class Config:
        orm_mode = True

class PostBase(BaseModel):
    image_url: str
    caption: str

class PostCreate(PostBase):
    author_id: int

class Post(PostBase):
    id: int
    author_id: int
    likes: int
    comments: List[Comment] = []

class UserCreate(BaseModel):
    username: str
    email: str
    password: str
    posts: List[Post] = []

class UserOut(BaseModel):
    id: int
    username: str
    email: str

    class Config:
        orm_mode = True
