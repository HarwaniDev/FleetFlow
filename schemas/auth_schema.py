from pydantic import BaseModel, ConfigDict, EmailStr, Field, model_validator

from database.models import UserRole


class RegisterRequest(BaseModel):
    """Schema for user registration request."""

    username: str = Field(min_length=3, max_length=50)
    email: EmailStr
    password: str = Field(min_length=8, max_length=64)
    confirm_password: str = Field(min_length=8, max_length=64)
    role: UserRole

    @model_validator(mode="after")
    def passwords_match(self) -> "RegisterRequest":
        """Validate that password and confirm_password are identical."""
        if self.password != self.confirm_password:
            raise ValueError("Password and confirm password do not match.")
        return self


class LoginRequest(BaseModel):
    """Schema for user login request."""

    username: str = Field(min_length=3, max_length=50)
    password: str = Field(min_length=1)
    role: UserRole


class TokenResponse(BaseModel):
    """Schema for JWT token response on successful login."""

    access_token: str
    token_type: str = "bearer"


class UserResponse(BaseModel):
    """Schema for user data in API responses."""

    model_config = ConfigDict(from_attributes=True)

    id: int
    username: str
    email: str
    full_name: str | None
    role: UserRole
