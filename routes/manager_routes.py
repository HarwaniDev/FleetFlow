from fastapi import APIRouter, status

from controllers.vehicle_controller import (
    handle_create_vehicle,
    handle_delete_vehicle,
    handle_get_all_vehicles,
    handle_get_fleet_kpis,
    handle_get_vehicle,
    handle_update_vehicle,
)
from schemas.kpi_schema import VehicleKPIResponse
from schemas.vehicle_schema import VehicleResponse

manager_router = APIRouter(prefix="/manager", tags=["Manager"])

manager_router.add_api_route(
    "/kpis",
    handle_get_fleet_kpis,
    methods=["GET"],
    response_model=VehicleKPIResponse,
    status_code=status.HTTP_200_OK,
    summary="Get fleet Key Performance Indicators",
)

manager_router.add_api_route(
    "/vehicles",
    handle_get_all_vehicles,
    methods=["GET"],
    response_model=list[VehicleResponse],
    status_code=status.HTTP_200_OK,
    summary="List all vehicles",
)

manager_router.add_api_route(
    "/vehicles/{vehicle_id}",
    handle_get_vehicle,
    methods=["GET"],
    response_model=VehicleResponse,
    status_code=status.HTTP_200_OK,
    summary="Get a vehicle by ID",
)

manager_router.add_api_route(
    "/vehicles",
    handle_create_vehicle,
    methods=["POST"],
    response_model=VehicleResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Add a new vehicle",
)

manager_router.add_api_route(
    "/vehicles/{vehicle_id}",
    handle_update_vehicle,
    methods=["PATCH"],
    response_model=VehicleResponse,
    status_code=status.HTTP_200_OK,
    summary="Update a vehicle",
)

manager_router.add_api_route(
    "/vehicles/{vehicle_id}",
    handle_delete_vehicle,
    methods=["DELETE"],
    status_code=status.HTTP_200_OK,
    summary="Delete a vehicle",
)