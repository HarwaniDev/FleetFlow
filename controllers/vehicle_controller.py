
from fastapi import Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional
from core.dependencies import require_role
from database.db import get_db
from database.models import User, UserRole, VehicleStatus
from schemas.vehicle_schema import (
    VehicleCreateRequest,
    VehicleResponse,
    VehicleUpdateRequest,
)
from schemas.kpi_schema import VehicleKPIResponse
from services.vehicle_service import (
    VehicleServiceException,
    create_vehicle,
    delete_vehicle,
    get_all_vehicles,
    get_fleet_kpis,
    get_vehicle_by_id,
    update_vehicle,
)


async def handle_get_all_vehicles(
    db: AsyncSession = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    vehicle_type: Optional[str] = None,
    status: Optional[VehicleStatus] = None,
    region: Optional[str] = None,
    query: Optional[str] = None,
    _current_user: User = Depends(require_role(UserRole.MANAGER)),
) -> list[VehicleResponse]:
    """
    List all vehicles with optional filters and pagination.
    - **skip**: Number of records to skip (default 0)
    - **limit**: Max number of records to return (default 100)
    - **vehicle_type**: Filter by type (Truck, Van, etc.)
    - **status**: Filter by status (Available, On Trip, etc.)
    - **region**: Filter by region
    - **query**: General search on name or license plate
    """
    vehicles = await get_all_vehicles(
        db,
        skip=skip,
        limit=limit,
        vehicle_type=vehicle_type,
        status=status,
        region=region,
        query=query,
    )
    return [VehicleResponse.model_validate(v) for v in vehicles]


async def handle_get_vehicle(
    vehicle_id: int,
    db: AsyncSession = Depends(get_db),
    _current_user: User = Depends(require_role(UserRole.MANAGER)),
) -> VehicleResponse:
    """Get a single vehicle by ID — Manager only."""
    try:
        vehicle = await get_vehicle_by_id(vehicle_id, db)
        return VehicleResponse.model_validate(vehicle)
    except VehicleServiceException as e:
        raise HTTPException(status_code=e.status_code, detail=e.message)


async def handle_create_vehicle(
    request: VehicleCreateRequest,
    db: AsyncSession = Depends(get_db),
    _current_user: User = Depends(require_role(UserRole.MANAGER)),
) -> VehicleResponse:
    """Create a new vehicle — Manager only."""
    try:
        vehicle = await create_vehicle(request, db)
        return VehicleResponse.model_validate(vehicle)
    except VehicleServiceException as e:
        raise HTTPException(status_code=e.status_code, detail=e.message)


async def handle_update_vehicle(
    vehicle_id: int,
    request: VehicleUpdateRequest,
    db: AsyncSession = Depends(get_db),
    _current_user: User = Depends(require_role(UserRole.MANAGER)),
) -> VehicleResponse:
    """Update a vehicle by ID — Manager only."""
    try:
        vehicle = await update_vehicle(vehicle_id, request, db)
        return VehicleResponse.model_validate(vehicle)
    except VehicleServiceException as e:
        raise HTTPException(status_code=e.status_code, detail=e.message)


async def handle_delete_vehicle(
    vehicle_id: int,
    db: AsyncSession = Depends(get_db),
    _current_user: User = Depends(require_role(UserRole.MANAGER)),
) -> dict:
    """Delete a vehicle by ID — Manager only."""
    try:
        await delete_vehicle(vehicle_id, db)
        return {"message": "Vehicle deleted successfully"}
    except VehicleServiceException as e:
        raise HTTPException(status_code=e.status_code, detail=e.message)


async def handle_get_fleet_kpis(
    db: AsyncSession = Depends(get_db),
    _current_user: User = Depends(require_role(UserRole.MANAGER)),
) -> VehicleKPIResponse:
    """
    Get high-level fleet KPIs — Manager only.
    - Active Fleet count
    - Maintenance Alerts count
    - Utilization Rate percentage
    """
    kpis = await get_fleet_kpis(db)
    return VehicleKPIResponse(**kpis)

