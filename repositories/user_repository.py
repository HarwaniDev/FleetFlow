from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database.models import User


async def find_by_username(username: str, db: AsyncSession) -> User | None:
    """Find a user by their username. Returns None if not found."""
    query = select(User).where(User.username == username)
    result = await db.execute(query)
    return result.scalar_one_or_none()


async def find_by_email(email: str, db: AsyncSession) -> User | None:
    """Find a user by their email. Returns None if not found."""
    query = select(User).where(User.email == email)
    result = await db.execute(query)
    return result.scalar_one_or_none()


async def create_user(user_data: dict, db: AsyncSession) -> User:
    """
    Create a new user record in the database.

    Expects user_data to contain username, email, hashed_password, and role.
    Returns the created User instance.
    """
    new_user = User(**user_data)
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)
    return new_user
