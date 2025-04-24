from fastapi import FastAPI
from app.features.users import routes as user_routes
from app.core.database import Base, engine

from app.features.users import (
    models,
)

# Create all tables
Base.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(user_routes.router, tags=["Users"])
