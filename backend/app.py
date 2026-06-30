from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

import os
import shutil

from vector_store import build_vector_store
from streaming import stream_answer

app = FastAPI(
    title="MultiPDF AI",
    description="Chat with Multiple PDFs using RAG",
    version="2.0.0"
)

# ======================================================
# CORS
# ======================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",

        "https://multi-pdf-ai.vercel.app",

        # If Vercel creates preview deployments
        "https://multi-pdf-sojjbn64q-ram-masane.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ======================================================
# Upload Folder
# ======================================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# ======================================================
# Models
# ======================================================

class ChatRequest(BaseModel):
    question: str

# ======================================================
# Home
# ======================================================

@app.get("/")
def home():
    return {
        "message": "🚀 MultiPDF AI Backend Running"
    }

# ======================================================
# Upload PDFs
# ======================================================

@app.post("/upload")
async def upload_pdfs(files: list[UploadFile] = File(...)):

    print("=" * 80)
    print("Uploading PDFs...")
    print("=" * 80)

    # Remove old PDFs
    for filename in os.listdir(UPLOAD_FOLDER):
        path = os.path.join(UPLOAD_FOLDER, filename)

        if os.path.isfile(path):
            os.remove(path)

    uploaded_files = []

    # Save new PDFs
    for file in files:

        file_path = os.path.join(UPLOAD_FOLDER, file.filename)

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Return original filename
        uploaded_files.append(file.filename)

    print("Building FAISS Index...")

    build_vector_store()

    print("Upload Complete!")

    return {
        "success": True,
        "message": "PDFs uploaded successfully!",
        "files": uploaded_files
    }

# ======================================================
# Chat
# ======================================================

@app.post("/chat")
def chat(request: ChatRequest):

    from rag import ask_pdf

    return ask_pdf(request.question)

# ======================================================
# Streaming Chat
# ======================================================

from fastapi.responses import StreamingResponse
import asyncio


@app.post("/chat/stream")
async def chat_stream(request: ChatRequest):

    async def generate():

        for chunk in stream_answer(request.question):

            if hasattr(chunk, "content") and chunk.content:

                for ch in chunk.content:
                    yield ch
                    await asyncio.sleep(0.01)

    return StreamingResponse(
        generate(),
        media_type="text/plain"
    )