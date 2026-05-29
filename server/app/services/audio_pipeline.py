import os
import uuid
import shutil

from fastapi import (
    UploadFile,
    HTTPException
)

from .transcription import (
    transcribe_audio
)

from .audio_analysis import (
    analyze_audio
)

from .llm_report import (
    generate_ai_report
)

UPLOAD_DIR = "uploads"

os.makedirs(
    UPLOAD_DIR,
    exist_ok=True
)

ALLOWED_EXTENSIONS = [
    ".mp3",
    ".wav",
    ".m4a"
]

MAX_FILE_SIZE = (
    20 * 1024 * 1024
)


async def process_audio(

    audio: UploadFile,

    question: str

):

    file_extension = os.path.splitext(
        audio.filename
    )[1].lower()

    if file_extension not in ALLOWED_EXTENSIONS:

        raise HTTPException(
            status_code=400,
            detail="Unsupported file format"
        )

    contents = await audio.read()

    if len(contents) > MAX_FILE_SIZE:

        raise HTTPException(
            status_code=400,
            detail="File size must be under 20MB"
        )

    await audio.seek(0)

    unique_filename = (
        f"{uuid.uuid4()}"
        f"{file_extension}"
    )

    file_path = os.path.join(
        UPLOAD_DIR,
        unique_filename
    )

    with open(
        file_path,
        "wb"
    ) as buffer:

        shutil.copyfileobj(
            audio.file,
            buffer
        )

    transcript = transcribe_audio(
        file_path
    )

    metrics = analyze_audio(
        file_path
    )

    ai_report = generate_ai_report(

        metrics,

        question,

        transcript

    )

    return {

        "transcript": transcript,

        "metrics": metrics,

        "ai_report": ai_report

    }