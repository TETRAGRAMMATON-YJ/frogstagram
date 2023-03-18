from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, text
from sqlalchemy.orm import relationship

# Import Base
from application.server.database import Base
from datetime import datetime

class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, index=True)
    image_url = Column(String, index=True)
    caption = Column(String, index=True)
    author_id = Column(Integer, ForeignKey("users.id"))
    likes = Column(Integer, default=0)

    comments = relationship("Comment", back_populates="post")

class Comment(Base):
    __tablename__ = "comments"

    id = Column(Integer, primary_key=True, index=True)
    text = Column(String, index=True)
    author_id = Column(Integer, ForeignKey("users.id"))
    post_id = Column(Integer, ForeignKey("posts.id"))
    likes = Column(Integer, default=0)

    post = relationship("Post", back_populates="comments")
    author = relationship("User", back_populates="comments")

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow, server_default=text('now()'))

    posts = relationship("Post", back_populates="author")
    comments = relationship("Comment", back_populates="author")
