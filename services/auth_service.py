from sqlalchemy.ext.asyncio import AsyncSession

from core.error_messages import ERROR_MESSAGES
from core.security import create_access_token, hash_password, verify_password
from database.models import User
from repositories import user_repository
from schemas.auth_schema import LoginRequest, RegisterRequest


class AuthServiceException(Exception):
    """Base exception for auth service errors."""

    def __init__(self, message: str, status_code: int = 400) -> None:
        self.message = message
        self.status_code = status_code
        super().__init__(self.message)


async def register_user(request: RegisterRequest, db: AsyncSession) -> User:
    """
    Register a new user.

    Validates that the username and email are not already taken,
    hashes the password with Argon2, and persists the user to the database.
    Raises AuthServiceException on duplicate username or email.
    """
    existing_user = await user_repository.find_by_username(request.username, db)
    if existing_user:
        raise AuthServiceException(
            ERROR_MESSAGES.USERNAME_TAKEN, status_code=409
        )

    existing_email = await user_repository.find_by_email(request.email, db)
    if existing_email:
        raise AuthServiceException(
            ERROR_MESSAGES.EMAIL_TAKEN, status_code=409
        )

    user_data = {
        "username": request.username,
        "email": request.email,
        "hashed_password": hash_password(request.password),
        "role": request.role,
    }

    new_user = await user_repository.create_user(user_data, db)
    return new_user


async def login_user(request: LoginRequest, db: AsyncSession) -> str:
    """
    Authenticate a user and return a JWT access token.

    Verifies the username exists, the password matches the Argon2 hash,
    and the provided role matches the stored role.
    Raises AuthServiceException on invalid credentials or role mismatch.
    """
    user = await user_repository.find_by_username(request.username, db)
    if not user:
        raise AuthServiceException(
            ERROR_MESSAGES.INVALID_CREDENTIALS, status_code=401
        )

    if not verify_password(request.password, user.hashed_password):
        raise AuthServiceException(
            ERROR_MESSAGES.INVALID_CREDENTIALS, status_code=401
        )

    if user.role != request.role:
        raise AuthServiceException(
            ERROR_MESSAGES.ROLE_MISMATCH, status_code=401
        )

    token = create_access_token(
        data={
            "id": user.id,
            "username": user.username,
            "role": user.role.value,
        }
    )
    return token
