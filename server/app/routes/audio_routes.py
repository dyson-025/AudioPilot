from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Form,
    HTTPException,
    Depends
)

from sqlalchemy.orm import Session

from ..db.database import get_db

from ..core.auth import get_current_user

from ..services.audio_pipeline import (
    process_audio
)

from ..services.analysis_service import (

    create_analysis,

    get_user_analyses,

    delete_user_analysis

)

router = APIRouter()


@router.post("/upload")
async def upload_audio(

    audio: UploadFile = File(...),

    question: str = Form(...),

    db: Session = Depends(get_db),

    current_user=Depends(get_current_user)

):

    result = await process_audio(

        audio,

        question

    )

    metrics = result["metrics"]

    transcript = result["transcript"]

    ai_report = result["ai_report"]

    create_analysis(

        db=db,

        user_id=current_user.id,

        filename=audio.filename,

        question=question,

        transcript=transcript,

        ai_report=ai_report,

        metrics=metrics

    )

    return {

        "message":
            "Analysis completed successfully",

        "filename":
            audio.filename,

        "question":
            question,

        "transcript":
            transcript,

        "metrics":
            metrics,

        "ai_report":
            ai_report

    }


@router.get("/my-analysis")
def get_my_analysis(

    db: Session = Depends(get_db),

    current_user=Depends(get_current_user)

):

    return get_user_analyses(

        db,

        current_user.id

    )


@router.delete(
    "/delete-analysis/{analysis_id}"
)
def delete_analysis(

    analysis_id: int,

    db: Session = Depends(get_db),

    current_user=Depends(get_current_user)

):

    analysis = delete_user_analysis(

        db,

        analysis_id,

        current_user.id

    )

    if not analysis:

        raise HTTPException(

            status_code=404,

            detail="Analysis not found"

        )

    return {

        "message":
            "Analysis deleted"

    }