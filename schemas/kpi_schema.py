from pydantic import BaseModel


class VehicleKPIResponse(BaseModel):
    """Schema for fleet Key Performance Indicators."""

    active_fleet: int
    maintenance_alerts: int
    utilization_rate: float
