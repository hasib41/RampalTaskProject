# 📚 STEP 7: Building the Hero Section

## 🎯 What Are We Doing?

Creating a **stunning, full-screen hero section** with:
- Auto-sliding text carousel
- Floating particle effects
- Animated gradient title
- Progress-bar indicators
- Scroll-down animation

---

## 🧠 How Does It Work?

### 1. Auto-Sliding Carousel

```tsx
const [currentSlide, setCurrentSlide] = useState(0);

// Auto-advance every 5 seconds
useEffect(() => {
  const timer = setInterval(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, 5000);
  return () => clearInterval(timer);
}, []);
```

**Key Points:**
- `% HERO_SLIDES.length` wraps around (0→1→2→0...)
- Cleanup prevents memory leaks
- `isAnimating` flag prevents spam-clicking

### 2. CSS Particle Animation

```css
.particle {
  animation: float-up linear infinite;
}

@keyframes float-up {
  0% { transform: translateY(0); opacity: 0; }
  10% { opacity: 1; }
  100% { transform: translateY(-100vh); opacity: 0; }
}
```

**20 particles** with random positions and timing create ambient effect.

### 3. Gradient Text Animation

```css
.hero-title {
  background: linear-gradient(135deg, #fff, #28a745, #20c997);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient-shift 5s ease infinite;
  background-size: 200% 200%;
}
```

---

## ✅ Features Implemented

| Feature | Implementation |
|---------|---------------|
| Auto-slider | `setInterval` + `useState` |
| Particles | CSS keyframes + random positioning |
| Gradient title | `background-clip: text` |
| Progress indicators | CSS animation synced to 5s |
| Scroll indicator | Mouse wheel animation |
| Responsive | Mobile-optimized buttons |

---

## 💡 Test Your Understanding

1. Why use `useCallback` for the `nextSlide` function?
2. How does `% length` create a circular loop?
3. What does `background-clip: text` do?

---

[← Previous: Step 6](step6.md) | [Back to Main](../PROJECT_START.md) | [Next: Step 8 →](step8.md)
