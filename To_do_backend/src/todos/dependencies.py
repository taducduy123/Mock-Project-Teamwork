from fastapi import Depends
from sqlalchemy.orm import Session
from src.database import get_db
from src.todos.service import TodoService


def get_todo_service(db: Session = Depends(get_db)) -> TodoService:
    """Dependency for getting TodoService instance"""
    return TodoService(db)
''' 
tell FastAPI that to create a TodoService we need db session 
-> FastAPI use get_db()
'''