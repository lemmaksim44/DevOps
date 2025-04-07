import pytest
from fastapi.testclient import TestClient
from database import get_db
from test_database import get_test_db, setup_test_db
from main import app
from schemas import *
from models import Base


@pytest.fixture(scope="function", autouse=True)
def override_get_db(get_test_db):
    app.dependency_overrides[get_db] = lambda: get_test_db


@pytest.fixture
def client():
    return TestClient(app)

# Root
def test_root(client):
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "API for veterinary clinic. Go to /docs or /redoc to find out more"}

# Register
def test_register(client):
    new_user = RegUser(username="testuser", password="strongpassword")
    response = client.post("/register/", json=new_user.model_dump())
    assert response.status_code == 200
    assert response.json()["username"] == "testuser"


def test_register__User_exists(client):
    new_user = RegUser(username="testuser", password="strongpassword")
    response = client.post("/register/", json=new_user.model_dump())
    assert response.status_code == 400
    assert response.json() == {"detail": "User already exists"}


def test_register__Week_password(client):
    new_user = RegUser(username="newtestuser", password="12345")
    response = client.post("/register/", json=new_user.model_dump())
    assert response.status_code == 400
    assert response.json() == {"detail": "Weak password"}

# Authorization & Authentication
def test_auth__Not_authenticated(client):
    response = client.get("/auth/")
    assert response.status_code == 401
    assert response.json() == {"detail": "Not authenticated"}


def test_auth__Authorization_with_invalid_credentials(client):
    login = AuthUser(username="1", password="1")
    response = client.post("/auth/", json=login.model_dump())
    assert response.status_code == 401
    assert response.json() == {"detail": "Invalid credentials"}


def test_auth__Authorization(client):
    login = AuthUser(username="testuser", password="strongpassword")
    response = client.post("/auth/", json=login.model_dump())
    assert response.status_code == 200
    assert "access_token" in response.json()
    assert "token_type" in response.json()
    token = response.json()["access_token"]


@pytest.fixture
def token(client):
    login = AuthUser(username="testuser", password="strongpassword")
    response = client.post("/auth/", json=login.model_dump())
    assert response.status_code == 200
    assert "access_token" in response.json()
    return response.json()["access_token"]


def test_auth__Authenticated(client, token):
    headers = {'Authorization': f'Bearer {token}'}
    response = client.get("/auth/", headers=headers)
    assert response.status_code == 200
    assert "username" in response.json()

# Animal type
def test_animal_type(client, token):
    headers = {'Authorization': f'Bearer {token}'}
    response = client.get("/animal_type/", headers=headers)
    
    assert response.status_code == 200
    assert isinstance(response.json(), list)
    assert len(response.json()) > 0
    
    for animal in response.json():
        assert "id" in animal 
        assert "animal" in animal
        assert isinstance(animal["id"], int)
        assert isinstance(animal["animal"], str)


def test_animal_type__Not_authenticated(client):
    response = client.get("/animal_type/")
    assert response.status_code == 401
    assert response.json() == {"detail": "Not authenticated"}

# GET Report
def test_get_report(client, token):
    headers = {'Authorization': f'Bearer {token}'}
    response = client.get("/report/", headers=headers)
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_get_report__Not_authenticated(client):
    response = client.get("/report/")
    assert response.status_code == 401
    assert response.json() == {"detail": "Not authenticated"}

# POST Report
def test_post_report(client, token):
    headers = {'Authorization': f'Bearer {token}'}
    json = {
        "date": "2025-04-01",
        "time": "10:30:00",
        "owner": "Новикова Ольга Васильевна",
        "pet": "Собака",
        "pet_name": "Луна"
    }
    response = client.post("/report/", headers=headers, json=json)
    assert response.status_code == 200
    assert "owner" in response.json()
    assert "pet_name" in response.json()


def test_post_report__Not_authenticated(client):
    json = {
        "date": "2025-04-01",
        "time": "10:30:00",
        "owner": "Новикова Ольга Васильевна",
        "pet": "Собака",
        "pet_name": "Луна"
    }
    response = client.post("/report/", json=json)
    assert response.status_code == 401
    assert response.json() == {"detail": "Not authenticated"}


def test_post_report__Date(client, token):
    headers = {'Authorization': f'Bearer {token}'}
    json = {
        "date": "2025-04-40",
        "time": "10:30:00",
        "owner": "Новикова Ольга Васильевна",
        "pet": "Собака",
        "pet_name": "Луна"
    }
    response = client.post("/report/", headers=headers, json=json)
    assert response.status_code == 422


def test_post_report__Time(client, token):
    headers = {'Authorization': f'Bearer {token}'}
    json = {
        "date": "2025-04-01",
        "time": "30:30:00",
        "owner": "Новикова Ольга Васильевна",
        "pet": "Собака",
        "pet_name": "Луна"
    }
    response = client.post("/report/", headers=headers, json=json)
    assert response.status_code == 422


def test_post_report__Owner(client, token):
    headers = {'Authorization': f'Bearer {token}'}
    json = {
        "date": "2025-04-01",
        "time": "10:30:00",
        "owner": "",
        "pet": "Собака",
        "pet_name": "Луна"
    }
    response = client.post("/report/", headers=headers, json=json)
    assert response.status_code == 401
    assert response.json() == {"detail": "No owner name"}


def test_post_report_Pet(client, token):
    headers = {'Authorization': f'Bearer {token}'}
    json = {
        "date": "2025-04-01",
        "time": "10:30:00",
        "owner": "Новикова Ольга Васильевна",
        "pet": 1,
        "pet_name": "Луна"
    }
    response = client.post("/report/", headers=headers, json=json)
    assert response.status_code == 422


def test_post_report_Pet_name(client, token):
    headers = {'Authorization': f'Bearer {token}'}
    json = {
        "date": "2025-04-01",
        "time": "10:30:00",
        "owner": "Новикова Ольга Васильевна",
        "pet": "Собака",
        "pet_name": ""
    }
    response = client.post("/report/", headers=headers, json=json)
    assert response.status_code == 401
    assert response.json() == {"detail": "No pet name"}

# PUT Report
def test_put_report(client, token):
    headers = {'Authorization': f'Bearer {token}'}
    json = {
        "id": 1,
        "date": "2025-04-02",
        "time": "10:30:00",
        "owner": "Новикова Ольга Васильевна",
        "pet": "Собака",
        "pet_name": "Луна"
    }
    response = client.put("/report/", headers=headers, json=json)
    assert response.status_code == 200
    assert "owner" in response.json()
    assert "pet_name" in response.json()


def test_put_report__Not_authenticated(client):
    json = {
        "id": 1,
        "date": "2025-04-02",
        "time": "10:30:00",
        "owner": "Новикова Ольга Васильевна",
        "pet": "Собака",
        "pet_name": "Луна"
    }
    response = client.put("/report/", json=json)
    assert response.status_code == 401
    assert response.json() == {"detail": "Not authenticated"}


def test_put_report__ID(client, token):
    headers = {'Authorization': f'Bearer {token}'}
    json = {
        "id": 100,
        "date": "2025-04-02",
        "time": "10:30:00",
        "owner": "Новикова Ольга Васильевна",
        "pet": "Собака",
        "pet_name": "Луна"
    }
    response = client.put("/report/", headers=headers, json=json)
    assert response.status_code == 404
    assert response.json() == {"detail": "Report not found"}


def test_put_report__Date(client, token):
    headers = {'Authorization': f'Bearer {token}'}
    json = {
        "id": 1,
        "date": "2025-04-40",
        "time": "10:30:00",
        "owner": "Новикова Ольга Васильевна",
        "pet": "Собака",
        "pet_name": "Луна"
    }
    response = client.put("/report/", headers=headers, json=json)
    assert response.status_code == 422


def test_put_report__Time(client, token):
    headers = {'Authorization': f'Bearer {token}'}
    json = {
        "id": 1,
        "date": "2025-04-02",
        "time": "30:30:00",
        "owner": "Новикова Ольга Васильевна",
        "pet": "Собака",
        "pet_name": "Луна"
    }
    response = client.put("/report/", headers=headers, json=json)
    assert response.status_code == 422


def test_put_report__Owner(client, token):
    headers = {'Authorization': f'Bearer {token}'}
    json = {
        "id": 1,
        "date": "2025-04-02",
        "time": "10:30:00",
        "owner": "",
        "pet": "Собака",
        "pet_name": "Луна"
    }
    response = client.put("/report/", headers=headers, json=json)
    assert response.status_code == 401
    assert response.json() == {"detail": "No owner name"}


def test_put_report__Pet(client, token):
    headers = {'Authorization': f'Bearer {token}'}
    json = {
        "id": 1,
        "date": "2025-04-02",
        "time": "10:30:00",
        "owner": "Новикова Ольга Васильевна",
        "pet": 1,
        "pet_name": "Луна"
    }
    response = client.put("/report/", headers=headers, json=json)
    assert response.status_code == 422


def test_put_report__Pet_name(client, token):
    headers = {'Authorization': f'Bearer {token}'}
    json = {
        "id": 1,
        "date": "2025-04-02",
        "time": "10:30:00",
        "owner": "Новикова Ольга Васильевна",
        "pet": "Собака",
        "pet_name": ""
    }
    response = client.put("/report/", headers=headers, json=json)
    assert response.status_code == 401
    assert response.json() == {"detail": "No pet name"}

# DELETE Report
def test_delete_report(client, token):
    headers = {'Authorization': f'Bearer {token}'}
    json = {"id": 1}
    response = client.request("DELETE", "/report", headers=headers, json=json)
    assert response.status_code == 200
    assert response.json() == {"message": "The report was successfully deleted"}


def test_delete_report__Not_found(client, token):
    headers = {'Authorization': f'Bearer {token}'}
    json = {"id": 100}
    response = client.request("DELETE", "/report", headers=headers, json=json)
    assert response.status_code == 404
    assert response.json() == {"detail": "Report not found"}


def test_delete_report__Not_authenticated(client):
    json = {"id": 1}
    response = client.request("DELETE", "/report", json=json)
    assert response.status_code == 401
    assert response.json() == {"detail": "Not authenticated"}