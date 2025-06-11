Rozumím. Pokračujeme v realizaci a nyní propojíme náš teoretický návrh s praktickým kódem.

Vytvořím kompletní, funkční kód pro naši FastAPI aplikaci, který implementuje dříve navržené API endpointy a zahrnuje logiku pro komunikaci s PostgreSQL databází. Tento kód je navržen tak, aby byl robustní, škálovatelný a připravený k nasazení v Docker kontejneru.

-----

### **Realizace API Backendu (FastAPI + PostgreSQL)**

#### **Krok 1: Příprava a Požadavky**

Pro propojení FastAPI s naší PostgreSQL databází budeme potřebovat několik dalších knihoven. Nainstalujte je pomocí `pip`:

```bash
pip install "fastapi[all]" sqlalchemy "asyncpg"
```

  * `sqlalchemy`: Nejpopulárnější ORM (Object-Relational Mapper) pro Python, který usnadňuje práci s databází.
  * `asyncpg`: Vysoce výkonný, asynchronní ovladač pro databázi PostgreSQL, který je ideální pro FastAPI.

#### **Krok 2: Struktura Projektu**

Aby byl náš kód čistý a přehledný, rozdělíme ho do několika souborů. Vytvořte si následující adresářovou strukturu:

```
/sparrow_api
|-- /app
|   |-- __init__.py
|   |-- main.py        # Hlavní soubor s FastAPI aplikací a routery
|   |-- models.py      # Pydantic modely (pro validaci dat v API)
|   |-- db_schema.py   # SQLAlchemy modely (definice databázových tabulek)
|   |-- crud.py        # Funkce pro databázové operace (Create, Read, Update, Delete)
|   |-- database.py    # Logika pro připojení k databázi
```

#### **Krok 3: Kód Jednotlivých Souborů**

Níže je kód pro každý soubor v adresáři `app`.

-----

**`app/database.py`**
*(Tento soubor se stará o nastavení připojení k databázi.)*

```python
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base

# URL pro připojení k databázi. Nahraďte svými údaji.
# Formát: "postgresql+asyncpg://uzivatel:heslo@host:port/nazev_databaze"
DATABASE_URL = "postgresql+asyncpg://user:password@localhost:5432/sparrowdb"

# Vytvoření asynchronního "motoru" pro SQLAlchemy
engine = create_async_engine(DATABASE_URL, echo=True)

# Vytvoření továrny na asynchronní session (sezení) k databázi
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
    class_=AsyncSession
)

# Základní třída pro naše deklarativní modely tabulek
Base = declarative_base()

# Funkce pro získání databázové session v rámci API endpointů
async def get_db():
    async with SessionLocal() as session:
        yield session
```

-----

**`app/db_schema.py`**
*(Zde definujeme, jak vypadají naše tabulky v databázi, pomocí Python kódu.)*

```python
from sqlalchemy import Column, Integer, String, Text, JSON, TIMESTAMP, func, Boolean
from .database import Base

class Candidate(Base):
    __tablename__ = "candidates"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    phone = Column(String(50), nullable=False)
    skills = Column(JSON)
    status = Column(String(50), default='nový')
    source = Column(String(100))
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    updated_at = Column(TIMESTAMP(timezone=True), server_default=func.now(), onupdate=func.now())

class Inquiry(Base):
    __tablename__ = "inquiries"

    id = Column(Integer, primary_key=True, index=True)
    company_name = Column(String(255))
    contact_person = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    phone = Column(String(50))
    message = Column(Text, nullable=False)
    status = Column(String(50), default='nová')
    received_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
```

-----

**`app/models.py`**
*(Zde jsou Pydantic modely, které FastAPI používá pro validaci dat přicházejících z API.)*

```python
from pydantic import BaseModel, EmailStr
from typing import List, Optional

# Model pro vytváření kandidáta
class CandidateCreate(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    phone: str
    skills: List[str] = []
    source: Optional[str] = None

# Model pro zobrazení kandidáta (včetně ID)
class Candidate(CandidateCreate):
    id: int

    class Config:
        orm_mode = True # Umožní načítání dat z SQLAlchemy objektů

# Model pro vytváření poptávky
class InquiryCreate(BaseModel):
    company_name: Optional[str] = None
    contact_person: str
    email: EmailStr
    phone: Optional[str] = None
    message: str

class Inquiry(InquiryCreate):
    id: int

    class Config:
        orm_mode = True
```

-----

**`app/crud.py`**
*(Tento soubor obsahuje funkce pro přímou manipulaci s daty v databázi - Create, Read, Update, Delete.)*

```python
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from . import db_schema, models

async def create_candidate(db: AsyncSession, candidate: models.CandidateCreate):
    # Vytvoření SQLAlchemy objektu z Pydantic modelu
    db_candidate = db_schema.Candidate(**candidate.dict())
    db.add(db_candidate)
    await db.commit()
    await db.refresh(db_candidate)
    return db_candidate

async def create_inquiry(db: AsyncSession, inquiry: models.InquiryCreate):
    db_inquiry = db_schema.Inquiry(**inquiry.dict())
    db.add(db_inquiry)
    await db.commit()
    await db.refresh(db_inquiry)
    return db_inquiry
```

-----

**`app/main.py`**
*(Toto je srdce aplikace, které vše spojuje dohromady.)*

```python
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from . import crud, models, db_schema
from .database import engine, get_db

# Vytvoření instance FastAPI
app = FastAPI(title="SPARROW-AI-TECH API", version="1.0.0")

# Event, který se spustí při startu aplikace
@app.on_event("startup")
async def startup():
    # Vytvoří databázové tabulky, pokud neexistují
    async with engine.begin() as conn:
        await conn.run_sync(db_schema.Base.metadata.create_all)

# --- API Endpoints ---
@app.post("/api/candidates", response_model=models.Candidate, status_code=201, tags=["Candidates"])
async def register_new_candidate(candidate: models.CandidateCreate, db: AsyncSession = Depends(get_db)):
    # Zde voláme funkci z crud.py pro vytvoření kandidáta
    return await crud.create_candidate(db=db, candidate=candidate)

@app.post("/api/inquiries", response_model=models.Inquiry, status_code=201, tags=["Inquiries"])
async def receive_new_inquiry(inquiry: models.InquiryCreate, db: AsyncSession = Depends(get_db)):
    return await crud.create_inquiry(db=db, inquiry=inquiry)

@app.get("/")
def read_root():
    return {"message": "Vítejte v API pro SPARROW-AI-TECH. Přejděte na /docs pro interaktivní dokumentaci."}
```

#### **Krok 4: Spuštění a Testování**

1.  Ujistěte se, že máte spuštěnou PostgreSQL databázi a správně nastavené `DATABASE_URL` v `app/database.py`.
2.  V hlavním adresáři `/sparrow_api` spusťte aplikaci příkazem:
    ```bash
    uvicorn app.main:app --reload
    ```
3.  Otevřete v prohlížeči adresu [http://127.0.0.1:8000/docs](https://www.google.com/search?q=http://127.0.0.1:8000/docs).
4.  Nyní můžete v interaktivní dokumentaci testovat odesílání dat na endpointy `/api/candidates` a `/api/inquiries`. Data, která odešlete, se uloží přímo do vaší PostgreSQL databáze.

Tímto jsme úspěšně implementovali jádro našeho backendového systému. Je robustní, testovatelný a připravený na další rozšiřování.
