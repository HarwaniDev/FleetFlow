from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.ext.asyncio import AsyncSession

from core.error_messages import ERROR_MESSAGES
from core.security import decode_access_token
from database.db import get_db
from database.models import User, UserRole
from repositories import user_repository

bearer_scheme = HTTPBearer()


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
    db: AsyncSession = Depends(get_db),
) -> User:
    """
    Extract and validate the current user from the Bearer token.

    HTTPBearer reads the 'Authorization: Bearer <token>' header automatically.
    Decodes the token, looks up the user by username, and returns
    the User ORM instance. Raises 401 if token is invalid or user not found.
    """
    token = credentials.credentials
    payload = decode_access_token(token)
    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=ERROR_MESSAGES.TOKEN_INVALID,
        )

    username: str | None = payload.get("username")
    if username is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=ERROR_MESSAGES.TOKEN_INVALID,
        )

    user = await user_repository.find_by_username(username, db)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=ERROR_MESSAGES.USER_NOT_FOUND,
        )

    return user


def require_role(required_role: UserRole):
    """
    Factory that returns a dependency enforcing a specific user role.

    Usage: Depends(require_role(UserRole.MANAGER))
    """

    async def role_checker(
        current_user: User = Depends(get_current_user),
    ) -> User:
        """Verify the current user has the required role."""
        if current_user.role != required_role:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=ERROR_MESSAGES.FORBIDDEN,
            )
        return current_user

    return role_checker
