import pytest
from fastapi.testclient import TestClient
from src.main import app

client = TestClient(app)


def test_health_check():
    """Test health check endpoint"""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"


def test_root():
    """Test root endpoint"""
    response = client.get("/")
    assert response.status_code == 200
    assert "message" in response.json()


def test_create_todo():
    """Test creating a new todo"""
    response = client.post(
        "/api/v1/todos",
        json={"title": "Test Todo", "description": "Test Description"}
    )
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "Test Todo"
    assert data["description"] == "Test Description"
    assert data["is_completed"] is False
    assert "id" in data
    return data["id"]  # Return for cleanup


def test_get_todos():
    """Test getting all todos"""
    response = client.get("/api/v1/todos")
    assert response.status_code == 200
    data = response.json()
    assert "total" in data
    assert "items" in data


def test_get_todo_by_id():
    """Test getting a specific todo"""
    # Create a todo first
    create_response = client.post(
        "/api/v1/todos", 
        json={"title": "Test Todo"}
    )
    todo_id = create_response.json()["id"]
    
    # Get the todo
    response = client.get(f"/api/v1/todos/{todo_id}")
    assert response.status_code == 200
    assert response.json()["title"] == "Test Todo"


def test_update_todo():
    """Test updating a todo"""
    # Create a todo
    create_response = client.post(
        "/api/v1/todos",
        json={"title": "Original Title"}
    )
    todo_id = create_response.json()["id"]
    
    # Update the todo
    response = client.put(
        f"/api/v1/todos/{todo_id}",
        json={"title": "Updated Title", "is_completed": True}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Updated Title"
    assert data["is_completed"] is True


def test_delete_todo():
    """Test deleting a todo"""
    # Create a todo
    create_response = client.post(
        "/api/v1/todos",
        json={"title": "To Be Deleted"}
    )
    todo_id = create_response.json()["id"]
    
    # Delete the todo
    response = client.delete(f"/api/v1/todos/{todo_id}")
    assert response.status_code == 204
    
    # Verify it's deleted
    get_response = client.get(f"/api/v1/todos/{todo_id}")
    assert get_response.status_code == 404


def test_get_nonexistent_todo():
    """Test getting a todo that doesn't exist"""
    response = client.get("/api/v1/todos/999999")
    assert response.status_code == 404


def test_delete_nonexistent_todo():
    """Test deleting a todo that doesn't exist"""
    response = client.delete("/api/v1/todos/999999")
    assert response.status_code == 404