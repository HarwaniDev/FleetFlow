from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession

from core.error_messages import ERROR_MESSAGES
from database.models import Vehicle, VehicleStatus
from repositories import vehicle_repository
from schemas.vehicle_schema import VehicleCreateRequest, VehicleUpdateRequest


class VehicleServiceException(Exception):
    """Base exception for vehicle service errors."""

    def __init__(self, message: str, status_code: int = 400) -> None:
        self.message = message
        self.status_code = status_code
        super().__init__(self.message)


async def get_all_vehicles(
    db: AsyncSession,
    skip: int = 0,
    limit: int = 100,
    vehicle_type: Optional[str] = None,
    status: Optional[VehicleStatus] = None,
    region: Optional[str] = None,
    query: Optional[str] = None,
) -> list[Vehicle]:
    """Retrieve all vehicles with filtering and pagination."""
    return await vehicle_repository.find_all(
        db,
        skip=skip,
        limit=limit,
        vehicle_type=vehicle_type,
        status=status,
        region=region,
        query=query,
    )


async def get_vehicle_by_id(vehicle_id: int, db: AsyncSession) -> Vehicle:
    """
    Retrieve a single vehicle by ID.

    Raises VehicleServiceException if the vehicle does not exist.
    """
    vehicle = await vehicle_repository.find_by_id(vehicle_id, db)
    if not vehicle:
        raise VehicleServiceException(
            ERROR_MESSAGES.RECORD_NOT_FOUND, status_code=404
        )
    return vehicle


async def create_vehicle(request: VehicleCreateRequest, db: AsyncSession) -> Vehicle:
    """
    Create a new vehicle.

    Validates that the license plate is unique before inserting.
    Raises VehicleServiceException on duplicate license plate.
    """
    existing = await vehicle_repository.find_by_license_plate(
        request.license_plate, db
    )
    if existing:
        raise VehicleServiceException(
            ERROR_MESSAGES.DUPLICATE_ENTRY, status_code=409
        )

    vehicle_data = request.model_dump()
    return await vehicle_repository.create_vehicle(vehicle_data, db)


async def update_vehicle(
    vehicle_id: int, request: VehicleUpdateRequest, db: AsyncSession
) -> Vehicle:
    """
    Update an existing vehicle by ID.

    If the license plate is being changed, validates uniqueness.
    Raises VehicleServiceException if vehicle not found or license plate conflicts.
    """
    vehicle = await vehicle_repository.find_by_id(vehicle_id, db)
    if not vehicle:
        raise VehicleServiceException(
            ERROR_MESSAGES.RECORD_NOT_FOUND, status_code=404
        )

    if request.license_plate and request.license_plate != vehicle.license_plate:
        existing = await vehicle_repository.find_by_license_plate(
            request.license_plate, db
        )
        if existing:
            raise VehicleServiceException(
                ERROR_MESSAGES.DUPLICATE_ENTRY, status_code=409
            )

    update_data = request.model_dump(exclude_unset=True)
    return await vehicle_repository.update_vehicle(vehicle, update_data, db)


async def delete_vehicle(vehicle_id: int, db: AsyncSession) -> None:
    """
    Delete a vehicle by ID.

    Raises VehicleServiceException if the vehicle does not exist.
    """
    vehicle = await vehicle_repository.find_by_id(vehicle_id, db)
    if not vehicle:
        raise VehicleServiceException(
            ERROR_MESSAGES.RECORD_NOT_FOUND, status_code=404
        )
    await vehicle_repository.delete_vehicle(vehicle, db)


async def get_fleet_kpis(db: AsyncSession) -> dict:
    """
    Calculate high-level fleet KPIs.
    - Active Fleet: Status is ON_TRIP
    - Maintenance Alerts: Status is IN_SHOP
    - Utilization Rate: (ON_TRIP / (AVAILABLE + ON_TRIP + IN_SHOP)) * 100
    """
    counts = await vehicle_repository.get_status_counts(db)

    on_trip = counts.get(VehicleStatus.ON_TRIP, 0)
    in_shop = counts.get(VehicleStatus.IN_SHOP, 0)
    available = counts.get(VehicleStatus.AVAILABLE, 0)

    total_active = on_trip + in_shop + available

    utilization_rate = (on_trip / total_active * 100) if total_active > 0 else 0.0

    return {
        "active_fleet": on_trip,
        "maintenance_alerts": in_shop,
        "utilization_rate": round(utilization_rate, 2),
    }

