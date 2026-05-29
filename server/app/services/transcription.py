from groq import Groq

from ..core.config import (
    GROQ_API_KEY,
    GROQ_TRANSCRIPTION_MODEL
)

client = Groq(
    api_key=GROQ_API_KEY
)


def transcribe_audio(
    file_path: str
) -> str:

    try:

        with open(
            file_path,
            "rb"
        ) as file:

            transcription = (
                client.audio.transcriptions.create(

                    file=(
                        file_path,
                        file.read()
                    ),

                    model=GROQ_TRANSCRIPTION_MODEL,

                    response_format="verbose_json"

                )
            )

        return transcription.text

    except Exception:

        return ""