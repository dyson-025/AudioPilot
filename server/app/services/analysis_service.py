from sqlalchemy.orm import Session

from ..db.models import Analysis


def create_analysis(

    db: Session,

    user_id: int,

    filename: str,

    question: str,

    transcript: str,

    ai_report: str,

    metrics: dict

):

    analysis = Analysis(

        user_id=user_id,

        filename=filename,

        question=question,

        transcript=transcript,

        ai_report=ai_report,

        clarity_score=metrics[
            "clarity_score"
        ],

        energy=metrics[
            "energy"
        ],

        silence_percentage=metrics[
            "silence_percentage"
        ],

        noise_level=metrics[
            "noise_level"
        ],

        duration=metrics[
            "duration"
        ]

    )

    db.add(
        analysis
    )

    db.commit()

    db.refresh(
        analysis
    )

    return analysis


def get_user_analyses(

    db: Session,

    user_id: int

):

    return (

        db.query(
            Analysis
        )

        .filter(
            Analysis.user_id == user_id
        )

        .order_by(
            Analysis.created_at.desc()
        )

        .all()

    )


def delete_user_analysis(

    db: Session,

    analysis_id: int,

    user_id: int

):

    analysis = (

        db.query(
            Analysis
        )

        .filter(

            Analysis.id == analysis_id,

            Analysis.user_id == user_id

        )

        .first()

    )

    if not analysis:

        return None

    db.delete(
        analysis
    )

    db.commit()

    return analysis