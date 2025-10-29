from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.config import settings
from src.database import init_db, get_db
from src.todos.router import router as todos_router
from sqlalchemy import inspect, text
from sqlalchemy.exc import OperationalError, ProgrammingError

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    debug=settings.DEBUG,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(todos_router, prefix=settings.API_V1_PREFIX, tags=["Todos"])

# @app.on_event("startup")
# async def startup_event():
#     init_db()  # initialize tables if needed
@app.on_event("startup")
def test_db_connection():
    db = next(get_db())
    try:
        # Check if tables exist
        inspector = inspect(db.bind)
        tables = inspector.get_table_names()
        
        if not tables:
            # No tables exist, initialize database
            print("No tables found. Initializing database...")
            init_db()
            print("Database initialized successfully!")
        else:
            # Tables exist, just test connection
            db.execute(text("SELECT 1"))
            print(f"Connected to existing DB successfully! Found {len(tables)} tables.")
            
    except (OperationalError, ProgrammingError) as e:
        print("Failed to connect to DB:", e)
        # Optionally try to initialize
        try:
            print("Attempting to initialize database...")
            init_db()
            print("Database initialized successfully!")
        except Exception as init_error:
            print("Failed to initialize database:", init_error)
    except Exception as e:
        print("Unexpected error:", e)
    finally:
        db.close()

@app.get("/")
def root():
    return {"message": f"{settings.APP_NAME} is running"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}
