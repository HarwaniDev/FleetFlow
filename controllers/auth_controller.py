from fastapi import Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from database.db import get_db
from schemas.auth_schema import (
    LoginRequest,
    RegisterRequest,
    TokenResponse,
    UserResponse,
)
from services.auth_service import AuthServiceException, login_user, register_user


async def handle_register(
    request: RegisterRequest,
    db: AsyncSession = Depends(get_db),
) -> UserResponse:
    """Handle user registration — delegates to auth service."""
    try:
        user = await register_user(request, db)
        return UserResponse.model_validate(user)
    except AuthServiceException as e:
        raise HTTPException(status_code=e.status_code, detail=e.message)


async def handle_login(
    request: LoginRequest,
    db: AsyncSession = Depends(get_db),
) -> TokenResponse:
    """Handle user login — delegates to auth service, returns JWT."""
    try:
        token = await login_user(request, db)
        return TokenResponse(access_token=token)
    except AuthServiceException as e:
        raise HTTPException(status_code=e.status_code, detail=e.message)
