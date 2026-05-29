import librosa

import numpy as np


SILENCE_THRESHOLD = 0.01

MIN_CLARITY_SCORE = 50

MAX_CLARITY_SCORE = 100


def analyze_audio(
    file_path: str
) -> dict:

    y, sr = librosa.load(
        file_path,
        sr=None
    )

    duration = librosa.get_duration(
        y=y,
        sr=sr
    )

    rms = librosa.feature.rms(
        y=y
    )[0]

    avg_energy = float(
        np.mean(rms)
    )

    silent_frames = np.sum(
        rms < SILENCE_THRESHOLD
    )

    silence_percentage = float(

        (silent_frames / len(rms))

        * 100

    )

    clarity_score = int(

        max(

            MIN_CLARITY_SCORE,

            min(

                MAX_CLARITY_SCORE,

                MAX_CLARITY_SCORE
                - silence_percentage

            )

        )

    )

    if silence_percentage < 10:

        noise_level = "Low"

    elif silence_percentage < 30:

        noise_level = "Medium"

    else:

        noise_level = "High"

    return {

        "duration":
            round(duration, 2),

        "energy":
            round(avg_energy, 3),

        "silence_percentage":
            round(
                silence_percentage,
                2
            ),

        "clarity_score":
            clarity_score,

        "noise_level":
            noise_level,

    }