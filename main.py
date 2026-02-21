from fastapi import FastAPI
import uvicorn

app = FastAPI(title="FleetFlow API")

@app.get("/health-check")
async def health_check():
    return {"status": "ok", "message": "FleetFlow server is running"}

def main():
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

if __name__ == "__main__":
    main()
