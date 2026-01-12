# 📚 STEP 13: Frontend-Backend Integration

## 🎯 What Are We Doing?

Connecting the React frontend to Django backend with:
- API service layer with typed functions
- Custom hooks for data fetching
- Loading and error state management

---

## 🧠 How Does It Work?

### 1. API Service Layer

```typescript
// services/api.ts
const API_BASE_URL = 'http://localhost:8000/api';

export async function getTenders(): Promise<Tender[]> {
  const response = await fetch(`${API_BASE_URL}/tenders/`);
  return response.json();
}
```

### 2. Custom Hooks

```typescript
// hooks/useApi.ts
export function useTenders() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    getTenders().then(setData).finally(() => setLoading(false));
  }, []);
  
  return { data, loading };
}
```

### 3. Usage in Components

```tsx
function TendersList() {
  const { data, loading, error } = useTenders();
  
  if (loading) return <Spinner />;
  if (error) return <Error message={error} />;
  return data.map(tender => <TenderCard {...tender} />);
}
```

---

## 📁 Files Created

| File | Purpose |
|------|---------|
| `services/api.ts` | API functions + TypeScript types |
| `hooks/useApi.ts` | Custom hooks for data fetching |

---

## ✅ API Functions Available

| Function | Returns |
|----------|---------|
| `getTenders()` | All tenders |
| `getNews()` | All news |
| `getFeaturedNews()` | Featured news only |
| `getCareers()` | Job openings |
| `getProjectStats()` | Homepage stats |
| `submitContactForm(data)` | Submit contact |

---

## 💡 Test Your Understanding

1. Why use `type` keyword for importing interfaces?
2. What does `isMounted` check prevent?
3. Why centralize API calls in a service layer?

---

[← Previous: Step 12](step12.md) | [Back to Main](../PROJECT_START.md)
