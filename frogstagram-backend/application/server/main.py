import uvicorn
from fastapi import FastAPI, File, UploadFile
from fastapi import Depends, HTTPException, status, APIRouter, Response
from starlette.responses import RedirectResponse

import os

from sqlalchemy.orm import Session
from application import models, schema
from application.components import predict, read_imagefile
from application.components.prediction import symptom_check

app_desc = """
<h2>A FastAPI-based backend for Frogstagram</h2>
<br>by Logan Jorgensen"""

app = FastAPI(title='Frogstagram Backend', description=app_desc)

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

        # Return a response
        return Response(status_code=200, content="Frog!")
    
    # Otherwise, the image is not a frog, so just return a simple response
    else:
        # Return a response
        return Response(status_code=200, content="Not a frog!")