# main.py
import os
import databases
import sqlalchemy
from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

# --- Database Configuration ---
# It's recommended to use environment variables for database credentials in a real application.
# For this example, we'll use placeholders.
# Example DATABASE_URL: "postgresql://user:password@host:port/database"
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:password@localhost/sparrowdb")

database = databases.Database(DATABASE_URL)
metadata = sqlalchemy.MetaData()

# --- Database Table Definitions (SQLAlchemy) ---

# Table for candidates, matching the SQL schema
candidates = sqlalchemy.Table(
    "candidates",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("first_name", sqlalchemy.String(100), nullable=False),
    sqlalchemy.Column("last_name", sqlalchemy.String(100), nullable=False),
    sqlalchemy.Column("email", sqlalchemy.String(255), nullable=False, unique=True),
    sqlalchemy.Column("phone", sqlalchemy.String(50), nullable=False),
    sqlalchemy.Column("skills", sqlalchemy.JSON, default=[]),
    sqlalchemy.Column("status", sqlalchemy.String(50), default="nový"),
    sqlalchemy.Column("source", sqlalchemy.String(100)),
    sqlalchemy.Column("created_at", sqlalchemy.DateTime(timezone=True), default=datetime.utcnow),
    sqlalchemy.Column("updated_at", sqlalchemy.DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow),
)

# Table for inquiries, matching the SQL schema
inquiries = sqlalchemy.Table(
    "inquiries",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("company_name", sqlalchemy.String(255)),
    sqlalchemy.Column("contact_person", sqlalchemy.String(255), nullable=False),
    sqlalchemy.Column("email", sqlalchemy.String(255), nullable=False),
    sqlalchemy.Column("phone", sqlalchemy.String(50)),
    sqlalchemy.Column("message", sqlalchemy.Text, nullable=False),
    sqlalchemy.Column("status", sqlalchemy.String(50), default="nová"),
    sqlalchemy.Column("received_at", sqlalchemy.DateTime(timezone=True), default=datetime.utcnow),
)


# --- FastAPI Application Instance ---
app = FastAPI(
    title="SPARROW-AI-TECH API",
    description="Backend services for the SPARROW platform MVP.",
    version="1.0.0"
)

# --- Lifespan Events (Database Connection) ---
# Connect to the database when the application starts
@app.on_event("startup")
async def startup():
    await database.connect()

# Disconnect from the database when the application shuts down
@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()


# --- Pydantic Models for Data Validation ---

# Model for creating a new candidate
class CandidateCreate(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    phone: str
    skills: List[str] = []
    source: Optional[str] = None

# Model for creating a new inquiry
class InquiryCreate(BaseModel):
    company_name: Optional[str] = None
    contact_person: str
    email: EmailStr
    phone: Optional[str] = None
    message: str


# --- API Endpoints ---

@app.get("/", tags=["Status"])
async def root():
    """Root endpoint to check API status."""
    return {"status": "API is running"}


@app.post("/api/candidates", status_code=status.HTTP_201_CREATED, tags=["Candidates"])
async def register_candidate(candidate: CandidateCreate):
    """
    Receives data about a new candidate and stores it in the database.
    """
    query = candidates.insert().values(
        first_name=candidate.first_name,
        last_name=candidate.last_name,
        email=candidate.email,
        phone=candidate.phone,
        skills={"skills_list": candidate.skills},  # Store list within a JSON object
        source=candidate.source,
    )
    try:
        last_record_id = await database.execute(query)
        return {
            "status": "success",
            "message": "Kandidát byl úspěšně zaregistrován.",
            "candidate_id": last_record_id,
        }
    except Exception as e:
        # This can happen if the email is not unique, or other database constraint fails.
        print(f"Error creating candidate: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Nepodařilo se uložit data kandidáta do databáze."
        )


@app.post("/api/inquiries", status_code=status.HTTP_201_CREATED, tags=["Inquiries"])
async def submit_inquiry(inquiry: InquiryCreate):
    """
    Receives data from the company contact form and stores it in the database.
    """
    query = inquiries.insert().values(
        company_name=inquiry.company_name,
        contact_person=inquiry.contact_person,
        email=inquiry.email,
        phone=inquiry.phone,
        message=inquiry.message,
    )
    try:
        last_record_id = await database.execute(query)
        # Here you could also trigger an email notification to yourself
        return {
            "status": "success",
            "message": "Děkujeme za vaši poptávku. Brzy se vám ozveme.",
            "inquiry_id": last_record_id
        }
    except Exception as e:
        print(f"Error creating inquiry: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Nepodařilo se zpracovat vaši poptávku."
        )

# To run this application:
# 1. Make sure you have a PostgreSQL database running.
# 2. Set the DATABASE_URL environment variable.
# 3. Install necessary packages: pip install fastapi uvicorn databases[postgresql] sqlalchemy asyncpg python-dotenv
# 4. Run the server: uvicorn main:app --reload
