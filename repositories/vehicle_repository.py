from typing import Optional
from sqlalchemy import func, or_, select
from sqlalchemy.ext.asyncio import AsyncSession

from database.models import Vehicle, VehicleStatus


async def find_all(
    db: AsyncSession,
    skip: int = 0,
    limit: int = 100,
    vehicle_type: Optional[str] = None,
    status: Optional[VehicleStatus] = None,
    region: Optional[str] = None,
    query: Optional[str] = None,
) -> list[Vehicle]:
    """
    Retrieve vehicles with optional filtering and pagination.
    """
    stmt = select(Vehicle)

    if vehicle_type:
        stmt = stmt.where(Vehicle.vehicle_type == vehicle_type)
    if status:
        stmt = stmt.where(Vehicle.status == status)
    if region:
        stmt = stmt.where(Vehicle.region == region)
    if query:
        stmt = stmt.where(
            or_(
                Vehicle.name_model.ilike(f"%{query}%"),
                Vehicle.license_plate.ilike(f"%{query}%"),
            )
        )

    stmt = stmt.offset(skip).limit(limit)
    result = await db.execute(stmt)
    return list(result.scalars().all())


async def find_by_id(vehicle_id: int, db: AsyncSession) -> Vehicle | None:
    """Find a vehicle by its primary key. Returns None if not found."""
    query = select(Vehicle).where(Vehicle.id == vehicle_id)
    result = await db.execute(query)
    return result.scalar_one_or_none()


async def find_by_license_plate(license_plate: str, db: AsyncSession) -> Vehicle | None:
    """Find a vehicle by its license plate. Returns None if not found."""
    query = select(Vehicle).where(Vehicle.license_plate == license_plate)
    result = await db.execute(query)
    return result.scalar_one_or_none()


async def create_vehicle(vehicle_data: dict, db: AsyncSession) -> Vehicle:
    """
    Insert a new vehicle record into the database.

    Returns the created Vehicle instance with its generated ID.
    """
    new_vehicle = Vehicle(**vehicle_data)
    db.add(new_vehicle)
    await db.commit()
    await db.refresh(new_vehicle)
    return new_vehicle


async def update_vehicle(vehicle: Vehicle, update_data: dict, db: AsyncSession) -> Vehicle:
    """
    Update an existing vehicle with the provided fields.

    Only non-None fields from update_data are applied.
    Returns the updated Vehicle instance.
    """
    for key, value in update_data.items():
        if value is not None:
            setattr(vehicle, key, value)
    await db.commit()
    await db.refresh(vehicle)
    return vehicle


async def delete_vehicle(vehicle: Vehicle, db: AsyncSession) -> None:
    """Delete a vehicle record from the database."""
    await db.delete(vehicle)
    await db.commit()


async def get_status_counts(db: AsyncSession) -> dict[VehicleStatus, int]:
    """
    Get the count of vehicles for each status.
    Returns a dictionary mapping status to count.
    """
    stmt = select(Vehicle.status, func.count(Vehicle.id)).group_by(Vehicle.status)
    result = await db.execute(stmt)
    return {row[0]: row[1] for row in result.all()}

