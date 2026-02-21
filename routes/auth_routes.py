from fastapi import APIRouter, status

from controllers.auth_controller import handle_login, handle_register
from schemas.auth_schema import TokenResponse, UserResponse

auth_router = APIRouter(prefix="/auth", tags=["Authentication"])

auth_router.add_api_route(
    "/register",
    handle_register,
    methods=["POST"],
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Register a new user",
)

auth_router.add_api_route(
    "/login",
    handle_login,
    methods=["POST"],
    response_model=TokenResponse,
    status_code=status.HTTP_200_OK,
    summary="Login and receive a JWT token",
)
