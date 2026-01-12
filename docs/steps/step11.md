# 📚 STEP 11: Setting Up Django Backend

## 🎯 What Are We Doing?

Setting up a **Django REST API** backend with:
- Virtual environment (isolated Python)
- Django REST Framework
- CORS for frontend communication
- Environment variables for security

---

## 🧠 How Does It Work?

### 1. Virtual Environment
```bash
python -m venv venv        # Create isolated environment
.\venv\Scripts\activate    # Activate it (Windows)
```

Keeps project dependencies separate from system Python.

### 2. Django Project Structure
```
backend/
├── core/              # Project settings
│   ├── settings.py    # Configuration
│   ├── urls.py        # URL routing
│   └── wsgi.py        # Production server
├── api/               # REST API app
├── manage.py          # Django CLI
├── requirements.txt   # Dependencies
└── .env.example       # Environment template
```

### 3. CORS Configuration
```python
CORS_ALLOWED_ORIGINS = [
    'http://localhost:5173',  # React frontend
]
```

Allows frontend to call backend API.

---

## ✅ What Was Installed

| Package | Version | Purpose |
|---------|---------|---------|
| Django | 6.0.1 | Web framework |
| djangorestframework | - | REST API tools |
| django-cors-headers | - | Cross-origin requests |
| python-dotenv | - | Environment variables |

---

## 💡 Test Your Understanding

1. What is a virtual environment and why use it?
2. What does CORS stand for and why is it needed?
3. Why use environment variables for secret keys?

---

[← Previous: Step 10](step10.md) | [Back to Main](../PROJECT_START.md) | [Next: Step 12 →](step12.md)
