from fastapi import HTTPException, status


class TodoNotFoundException(HTTPException):
    """Exception raised when a todo is not found"""
    
    def __init__(self, todo_id: int):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Todo with id {todo_id} not found"
        )


class TodoValidationException(HTTPException):
    """Exception raised when todo validation fails"""
    
    def __init__(self, detail: str):
        super().__init__(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=detail
        )