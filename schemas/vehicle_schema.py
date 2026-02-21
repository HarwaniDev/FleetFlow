from typing import Optional

from pydantic import BaseModel, ConfigDict, Field

from database.models import VehicleStatus


class VehicleCreateRequest(BaseModel):
    """Schema for creating a new vehicle."""

    name_model: str = Field(min_length=1, max_length=100, description="Vehicle name/model")
    license_plate: str = Field(min_length=1, max_length=20, description="Unique license plate")
    max_load_capacity: float = Field(gt=0, description="Max load capacity in kg")
    odometer: int = Field(default=0, ge=0, description="Current odometer reading")
    vehicle_type: str | None = Field(default=None, max_length=50, description="Truck, Van, Bike, etc.")
    region: str | None = Field(default=None, max_length=100)


class VehicleUpdateRequest(BaseModel):
    """Schema for updating an existing vehicle. All fields optional."""

    name_model: Optional[str] = Field(default=None, min_length=1, max_length=100)
    license_plate: Optional[str] = Field(default=None, min_length=1, max_length=20)
    max_load_capacity: Optional[float] = Field(default=None, gt=0)
    odometer: Optional[int] = Field(default=None, ge=0)
    vehicle_type: Optional[str] = Field(default=None, max_length=50)
    status: Optional[VehicleStatus] = None
    region: Optional[str] = Field(default=None, max_length=100)


class VehicleResponse(BaseModel):
    """Schema for vehicle data in API responses."""

    model_config = ConfigDict(from_attributes=True)

    id: int
    name_model: str
    license_plate: str
    max_load_capacity: float
    odometer: int
    status: VehicleStatus
    vehicle_type: str | None
    region: str | None
