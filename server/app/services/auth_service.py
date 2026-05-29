from sqlalchemy.orm import Session

from ..db.models import User

from ..core.auth import (
    hash_password,
    verify_password,
    create_access_token
)


def register_user(

    db: Session,

    name: str,

    email: str,

    password: str

):

    existing_user = db.query(User).filter(
        User.email == email
    ).first()

    if existing_user:
        return None

    user = User(

        name=name,

        email=email,

        password=hash_password(password)

    )

    db.add(user)

    db.commit()

    db.refresh(user)

    return user


def authenticate_user(

    db: Session,

    email: str,

    password: str

):

    user = db.query(User).filter(
        User.email == email
    ).first()

    if not user:
        return None

    if not verify_password(
        password,
        user.password
    ):
        return None

    return user


def update_user_profile(

    db: Session,

    user: User,

    name: str,

    email: str

):

    user.name = name

    user.email = email

    db.commit()

    db.refresh(user)

    return user


def update_user_password(

    db: Session,

    user: User,

    password: str

):

    user.password = hash_password(
        password
    )

    db.commit()

    db.refresh(user)

    return user


def generate_token(

    email: str

):

    return create_access_token({
        "sub": email
    })