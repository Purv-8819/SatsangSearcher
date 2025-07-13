from fastapi import APIRouter
from utils import embedding
    

router = APIRouter()

@router.get("/")
def getRelatingDoc(payload:str):
    results = embedding.getDocs(payload)
    return {"results": results}

@router.get("/text")
def getContents(path: str):
    content = ""

    with open(path[7:], "r") as f:
        content = f.read()
    return {"text": content}