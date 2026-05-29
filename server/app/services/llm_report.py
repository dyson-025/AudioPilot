from groq import Groq

from ..core.config import (
    GROQ_API_KEY,
    GROQ_MODEL
)

client = Groq(
    api_key=GROQ_API_KEY
)


def generate_ai_report(

    metrics: dict,

    user_question: str,

    transcript: str = ""

):

    prompt = f"""
You are AudioPilot AI,
an AI assistant for audio understanding
and improvement.

Transcript:
{transcript}

Audio Metrics:
- Clarity Score: {metrics['clarity_score']}
- Noise Level: {metrics['noise_level']}
- Silence Percentage: {metrics['silence_percentage']}%
- Energy: {metrics['energy']}

User Question:
{user_question}

Instructions:
- Understand the audio context naturally.
- Use transcript, metrics and user intent together.
- Focus on answering what the user wants.
- Give concise, natural and useful insights.
- Suggest improvements when relevant.
- Keep the response professional and easy to understand.
"""

    try:

        completion = client.chat.completions.create(

            model=GROQ_MODEL,

            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],

            temperature=0.4,

            max_tokens=500

        )

        return completion.choices[0].message.content

    except Exception:

        return (
            "Unable to generate AI insights "
            "at the moment. Please try again."
        )