from fastapi import APIRouter
from app.users.routes import router as user_router
from app.skills.routes import router as skills_router
from app.projects.routes import router as projects_router

api_router = APIRouter()

# api_router.include_router(user_router, prefix="/users", tags=["Users"])
# api_router.include_router(skills_router, prefix="/skills", tags=["Skills"])
# api_router.include_router(projects_router, prefix="/projects", tags=["Projects"])
