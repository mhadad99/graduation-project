from fastapi import FastAPI
from app.core.database import Base, engine
from app.features.users import models, routes as user_routes

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(user_routes.router, prefix="/auth", tags=["Auth"])
