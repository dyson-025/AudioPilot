from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from ..db.database import get_db
from ..db.models import User

from ..schemas.auth import (
    UserRegister,
    UserLogin,
    UpdateProfileRequest,
    ChangePasswordRequest
)

from ..core.auth import (
    get_current_user
)

from ..services.auth_service import (
    register_user,
    authenticate_user,
    update_user_profile,
    update_user_password,
    generate_token
)

router = APIRouter()


@router.post("/register")
def register(
    user: UserRegister,
    db: Session = Depends(get_db)
):

    new_user = register_user(
        db,
        user.name,
        user.email,
        user.password
    )

    if not new_user:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    return {
        "message": "User registered successfully"
    }


@router.post("/login")
def login(
    user: UserLogin,
    db: Session = Depends(get_db)
):

    db_user = authenticate_user(
        db,
        user.email,
        user.password
    )

    if not db_user:
        raise HTTPException(
            status_code=400,
            detail="Invalid credentials"
        )

    access_token = generate_token(
        db_user.email
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }


@router.get("/me")
def get_me(
    current_user: User = Depends(
        get_current_user
    )
):

    return {
        "id": current_user.id,
        "name": current_user.name,
        "email": current_user.email
    }


@router.put("/update-profile")
def update_profile(

    data: UpdateProfileRequest,

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )

):

    update_user_profile(

        db,

        current_user,

        data.name,

        data.email

    )

    return {
        "message": "Profile updated"
    }


@router.put("/change-password")
def change_password(

    data: ChangePasswordRequest,

    db: Session = Depends(get_db),

    current_user: User = Depends(
        get_current_user
    )

):

    update_user_password(

        db,

        current_user,

        data.password

    )

    return {
        "message": "Password updated"
    }