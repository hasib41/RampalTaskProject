# 📚 STEP 12: Creating API Models & Endpoints

## 🎯 What Are We Doing?

Building a **complete REST API** with:
- Database models for website content
- Serializers to convert data to JSON
- ViewSets for CRUD operations
- Admin panel for content management

---

## 🧠 How Does It Work?

### 1. Models (Database Tables)

```python
class Tender(BaseModel):
    title = models.CharField(max_length=255)
    deadline = models.DateTimeField()
    category = models.CharField(choices=[...])
```

### 2. Serializers (Model → JSON)

```python
class TenderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tender
        fields = ['id', 'title', 'deadline', ...]
```

### 3. ViewSets (Handle HTTP)

```python
class TenderViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Tender.objects.filter(is_active=True)
    serializer_class = TenderSerializer
```

---

## 📡 API Endpoints Created

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/tenders/` | GET | List all tenders |
| `/api/news/` | GET | List all news |
| `/api/news/featured/` | GET | Featured news only |
| `/api/careers/` | GET | List job openings |
| `/api/contact/` | POST | Submit contact form |
| `/api/stats/` | GET | Homepage statistics |

---

## ✅ Models Created

| Model | Fields |
|-------|--------|
| **Tender** | title, description, reference_number, deadline, category |
| **News** | title, content, summary, is_featured |
| **Career** | title, department, requirements, job_type, deadline |
| **ContactMessage** | name, email, phone, subject, message |
| **ProjectStat** | label, value, suffix, icon, order |

---

## 💡 Test Your Understanding

1. What is a serializer and why is it needed?
2. What does `ReadOnlyModelViewSet` provide?
3. Why use `is_active=True` in querysets?

---

[← Previous: Step 11](step11.md) | [Back to Main](../PROJECT_START.md) | [Next: Frontend Integration →](step13.md)
