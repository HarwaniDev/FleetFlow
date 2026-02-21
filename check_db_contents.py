import asyncio
from sqlalchemy import select, func
from database.db import SessionLocal
from database.models import User, Vehicle, Driver, Trip

async def check_db():
    async with SessionLocal() as db:
        user_count = await db.execute(select(func.count(User.id)))
        vehicle_count = await db.execute(select(func.count(Vehicle.id)))
        driver_count = await db.execute(select(func.count(Driver.id)))
        trip_count = await db.execute(select(func.count(Trip.id)))
        
        print(f"Users: {user_count.scalar()}")
        print(f"Vehicles: {vehicle_count.scalar()}")
        print(f"Drivers: {driver_count.scalar()}")
        print(f"Trips: {trip_count.scalar()}")

if __name__ == "__main__":
    asyncio.run(check_db())
