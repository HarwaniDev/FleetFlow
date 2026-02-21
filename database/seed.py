import logging
from datetime import datetime, date

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from core.security import hash_password
from database.models import (
    User,
    UserRole,
    Vehicle,
    VehicleStatus,
    Driver,
    DriverStatus,
    Trip,
    TripStatus,
)

logger = logging.getLogger(__name__)


async def seed_db(db: AsyncSession):
    """
    Seed the database with initial data if it's empty.
    """
    # Check if any users exist
    result = await db.execute(select(User).limit(1))
    if result.scalar_one_or_none():
        print("Database already seeded. Skipping...")
        logger.info("Database already seeded. Skipping...")
        return

    print("Seeding database with initial data...")
    logger.info("Seeding database with initial data...")

    # 1. Create Users for all roles
    users = [
        User(
            username="manager01",
            email="manager@fleetflow.com",
            hashed_password=hash_password("manager123"),
            role=UserRole.MANAGER,
            full_name="Alice Manager",
        ),
        User(
            username="dispatcher01",
            email="dispatcher@fleetflow.com",
            hashed_password=hash_password("dispatcher123"),
            role=UserRole.DISPATCHER,
            full_name="Bob Dispatcher",
        ),
        User(
            username="safety01",
            email="safety@fleetflow.com",
            hashed_password=hash_password("safety123"),
            role=UserRole.SAFETY_OFFICER,
            full_name="Charlie Safety",
        ),
        User(
            username="analyst01",
            email="analyst@fleetflow.com",
            hashed_password=hash_password("analyst123"),
            role=UserRole.FINANCIAL_ANALYST,
            full_name="David Analyst",
        ),
    ]
    db.add_all(users)

    # 2. Create Vehicles
    vehicles = [
        Vehicle(
            name_model="Volvo FH16",
            license_plate="TRK-001",
            max_load_capacity=25000.0,
            odometer=150000,
            status=VehicleStatus.ON_TRIP,
            vehicle_type="Truck",
            region="North",
        ),
        Vehicle(
            name_model="Mercedes Sprinter",
            license_plate="VAN-002",
            max_load_capacity=3500.0,
            odometer=45000,
            status=VehicleStatus.AVAILABLE,
            vehicle_type="Van",
            region="East",
        ),
        Vehicle(
            name_model="Scania R450",
            license_plate="TRK-003",
            max_load_capacity=20000.0,
            odometer=89000,
            status=VehicleStatus.IN_SHOP,
            vehicle_type="Truck",
            region="West",
        ),
    ]
    db.add_all(vehicles)

    # 3. Create Drivers
    drivers = [
        Driver(
            name="John Doe",
            license_number="DL12345",
            license_expiry=date(2030, 12, 31),
            status=DriverStatus.ON_DUTY,
            safety_score=98.5,
        ),
        Driver(
            name="Jane Smith",
            license_number="DL67890",
            license_expiry=date(2028, 5, 20),
            status=DriverStatus.OFF_DUTY,
            safety_score=95.0,
        ),
    ]
    db.add_all(drivers)
    
    # Flush to get IDs for relationships
    await db.flush()

    # 4. Create a Sample Trip
    trip = Trip(
        vehicle_id=vehicles[0].id,
        driver_id=drivers[0].id,
        cargo_weight=12500.0,
        start_odometer=150000,
        status=TripStatus.DISPATCHED,
        created_at=datetime.utcnow(),
    )
    db.add(trip)

    await db.commit()
    print("Seeding completed successfully!")
    logger.info("Seeding completed successfully!")
