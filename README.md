# ⚡ Power Company Website

A professional power company website built with React + TypeScript frontend and Django REST Framework backend, connected to Supabase PostgreSQL.

![Power Plant](./frontend/public/images/hero-1.png)

## 🚀 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18, TypeScript, Vite, React Router |
| **Backend** | Django 6, Django REST Framework |
| **Database** | Supabase (PostgreSQL) |
| **Styling** | Vanilla CSS with CSS Variables |

## 📁 Project Structure

```
rampalProject/
├── frontend/                 # React + Vite + TypeScript
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Route pages
│   │   ├── hooks/            # Custom React hooks
│   │   ├── services/         # API service layer
│   │   └── constants/        # Static data & config
│   └── public/images/        # Static images
│
├── backend/                  # Django REST API
│   ├── core/                 # Django settings
│   ├── api/                  # REST API app
│   │   ├── models.py         # Database models
│   │   ├── serializers.py    # DRF serializers
│   │   ├── views.py          # API viewsets
│   │   └── management/       # Custom commands
│   └── manage.py
│
└── docs/steps/               # Step-by-step documentation
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+
- Python 3.10+
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/hasib41/RampalTaskProject.git
cd RampalTaskProject
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: http://localhost:5173

### 3. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate (Windows)
.\venv\Scripts\activate

# Activate (macOS/Linux)
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file (copy from .env.example)
cp .env.example .env

# Run migrations
python manage.py migrate

# Seed database with sample data
python manage.py seed_data

# Create admin user
python manage.py createsuperuser

# Run server
python manage.py runserver
```

Backend runs at: http://localhost:8000

## 🔗 Available Routes

### Frontend Pages

| Route | Page |
|-------|------|
| `/` | Homepage |
| `/about` | About Us |
| `/tenders` | Active Tenders |
| `/careers` | Job Openings |
| `/news` | News & Updates |
| `/contact` | Contact Form |

### API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/tenders/` | GET | List all tenders |
| `/api/news/` | GET | List all news |
| `/api/news/featured/` | GET | Featured news only |
| `/api/careers/` | GET | List job openings |
| `/api/contact/` | POST | Submit contact form |
| `/api/stats/` | GET | Homepage statistics |

### Admin Panel

- URL: http://localhost:8000/admin/
- Default: `admin` / `Admin123!`

## 🌐 Environment Variables

Create a `.env` file in the `backend/` directory:

```env
DJANGO_SECRET_KEY=your-secret-key
DEBUG=True
DATABASE_URL=postgresql://user:password@host:port/database
```

## 📊 Database Models

| Model | Description |
|-------|-------------|
| `Tender` | Tender/bid announcements |
| `News` | News articles (with featured flag) |
| `Career` | Job postings |
| `ContactMessage` | Contact form submissions |
| `ProjectStat` | Dynamic homepage statistics |

## 🧪 Development Commands

```bash
# Frontend
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # Run ESLint

# Backend
python manage.py runserver      # Start server
python manage.py migrate        # Run migrations
python manage.py seed_data      # Populate sample data
python manage.py createsuperuser # Create admin
```

## 📝 Features

- ✅ Responsive design (mobile-first)
- ✅ Animated hero section with carousel
- ✅ Dynamic stats counter animation
- ✅ Contact form with API submission
- ✅ Job listing with filter tabs
- ✅ News with featured articles
- ✅ Admin panel for content management
- ✅ TypeScript for type safety
- ✅ Supabase PostgreSQL integration

## 📚 Documentation

Detailed step-by-step documentation available in `docs/steps/`:

- Step 1-4: Planning & Setup
- Step 5-10: Frontend Development
- Step 11-13: Backend & API
- Step 14: All Pages with React Router

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is for educational purposes.

---

Built with ❤️ for learning web development best practices.
