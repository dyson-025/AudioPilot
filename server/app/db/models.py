from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    Text,
    ForeignKey,
    DateTime
)

from sqlalchemy.orm import relationship

from sqlalchemy.sql import func

from .database import Base


class User(Base):

    __tablename__ = "users"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(
        String(100),
        nullable=False
    )

    email = Column(
        String(255),
        unique=True,
        nullable=False,
        index=True
    )

    password = Column(
        String,
        nullable=False
    )

    analyses = relationship(
        "Analysis",
        back_populates="user",
        cascade="all, delete"
    )


class Analysis(Base):

    __tablename__ = "analyses"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    filename = Column(
        String(255),
        nullable=False
    )

    question = Column(
        Text,
        nullable=False
    )

    transcript = Column(
        Text
    )

    ai_report = Column(
        Text
    )

    clarity_score = Column(
        Float
    )

    energy = Column(
        Float
    )

    silence_percentage = Column(
        Float
    )

    noise_level = Column(
        String(50)
    )

    duration = Column(
        Float
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    user = relationship(
        "User",
        back_populates="analyses"
    )