import uvicorn
import os

from fastapi import FastAPI, Depends, HTTPException, status, File, UploadFile 

from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from sqlalchemy.orm import scoped_session, sessionmaker

import application.server.models as models
from application.server.models import User, Post, Comment
from application.server.schemas import UserCreate, UserOut, PostCreate, Post, CommentCreate, Comment
from application.server.database import SessionLocal, engine
from application.server.security import verify_password, get_password_hash
from application.server.token import create_access_token, SECRET_KEY

from starlette.responses import Response, RedirectResponse
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

from application.components import predict, read_imagefile

# Set up the database engine and session factory
engine = create_engine("sqlite:///users.db", connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine)
Session = scoped_session(SessionLocal, scopefunc=lambda: app.state.request)

# Bind engine
models.Base.metadata.create_all(bind=engine)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

app_desc = """<h2>Try this app by uploading any image with `predict/image`</h2>
<h2>Try Covid symptom checker api - it is just a learning app demo</h2>
<br>by Aniket Maurya"""


app_desc = """
<h2>A FastAPI-based backend for Frogstagram</h2>
<br>by Logan Jorgensen"""

app = FastAPI(title='Frogstagram Backend', description=app_desc)

# Allow all origins
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", include_in_schema=False)
async def index():
    return RedirectResponse(url="/docs")

@app.post("/predict/image")
async def predict_api(file: UploadFile = File(...)):
    extension = file.filename.split(".")[-1] in ("jpg", "jpeg", "png")
    if not extension:
        return "Image must be jpg or png format!"
    image = read_imagefile(await file.read())
    prediction = predict(image)

    # TODO: Add logic for username handling
    # TEMP: Set username to "test"
    user = "test"

    # Logic for handling prediction outcome. Prediction is in JSON format
    is_frog = False

    for subpred in prediction:
        # If the prediction contains "frog", then it's a frog
        if "frog" in subpred["class"]:
            # Set the flag to true
            is_frog = True 
            # Break out of the loop
            break

    # If the flag is true, then it's a frog. Store the file in the SQL database using SQLAlchemy
    if is_frog:

        # If the user folder doesn't exist, create it
        if not os.path.exists(f"images/{user}"):
            os.makedirs(f"images/{user}")

        # If the user's post folder doesn't exist, create it
        if not os.path.exists(f"images/{user}/posts"):
            os.makedirs(f"images/{user}/posts")

        with(open(f"images/{user}/posts/{file.filename}", "wb")) as buffer:
            # Convert JpegImageFile to bytes
            buffer.write(image.tobytes())

        # Return a response as json with the prediction "frog"
        return Response(status_code=200, content='{"prediction": "frog"}')

    # Otherwise, the image is not a frog, so just return a simple response
    else:
        # Otherwise, return JSON response with contents "not-frog"
        return Response(status_code=200, content='{"prediction": "not-frog"}')
    
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/register", response_model=UserOut)
def register(user: UserCreate, db: Session = Depends(get_db)):
    db_user = User(username=user.username, email=user.email, hashed_password=get_password_hash(user.password))
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user.to

@app.get("/posts")
def get_posts(db: Session = Depends(get_db)):
    posts = db.query(models.Post).all()
    return posts

@app.post("/posts")
def create_post(post: PostCreate, db: Session = Depends(get_db)):
    # Create a new post
    new_post = models.Post(title=post.title, content=post.content, author_id=post.author_id)
    # Add the new post to the database
    db.add(new_post)
    # Commit the changes to the database
    db.commit()
    # Refresh the database
    db.refresh(new_post)

    # Successful post creation. Return success message.
    return {"message": "Post created"}

@app.delete("/posts/{post_id}")
def delete_post(post_id: int, db: Session = Depends(get_db)):
    # Delete the post with the given id
    db.query(models.Post).filter(models.Post.id == post_id).delete()
    # Commit the changes to the database
    db.commit()

    # Successful post deletion. Return success message.
    return {"message": "Post deleted"}

# Get all comments for a given post based on the post id
@app.get("/posts/{post_id}/comments")
def get_comments(post_id: int, db: Session = Depends(get_db)):
    # Get all comments for the given post id
    comments = db.query(models.Comment).filter(models.Comment.post_id == post_id).all()
    return comments

# Adds a comment to the post with the given id
@app.post("/posts/{post_id}/comments")
def create_comment(post_id: int, comment: CommentCreate, db: Session = Depends(get_db)):
    # Create a new comment
    new_comment = models.Comment(content=comment.content, post_id=post_id, author_id=comment.author_id)
    # Add the new comment to the database
    db.add(new_comment)
    # Commit the changes to the database
    db.commit()
    # Refresh the database
    db.refresh(new_comment)

    # Successful comment creation. Return success message.
    return {"message": "Comment created"}

@app.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username or password")

    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

if __name__ == "__main__":
    uvicorn.run(app, debug=True)
