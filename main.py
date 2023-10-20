from fastapi import FastAPI, Depends
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import Optional

# Define Pydantic models
class Record(BaseModel):
    name: str
    caption: str
    meme_type: Optional[str] = None
    img_meme: str

# Create FastAPI app
app = FastAPI()

# Define API routes
@app.post("/records")
async def create_record(record: Record):
    # Do something with the record i.e. save it to a database
    return record

@app.get("/records")
async def get_records(records: Record):
    # Do something to get the records i.e. querying the database
    return records

# Mount static files directory
app.mount("/", StaticFiles(directory="D://Documents/vscode/WebA11y/public", html=True), name="A11yReport")