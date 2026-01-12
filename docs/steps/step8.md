# 📚 STEP 8: Building the About Section

## 🎯 What Are We Doing?

Creating a **professional About section** with:
- Scroll-triggered entrance animations
- Image with floating "10+ Years" badge
- Project specifications grid
- Decorative background elements

---

## 🧠 How Does It Work?

### 1. Scroll-Triggered Animation (Intersection Observer)

```tsx
const [isVisible, setIsVisible] = useState(false);
const sectionRef = useRef<HTMLElement>(null);

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    },
    { threshold: 0.2 }  // Trigger when 20% visible
  );

  if (sectionRef.current) observer.observe(sectionRef.current);
  return () => observer.disconnect();
}, []);

// Apply class when visible
<section className={`about ${isVisible ? 'visible' : ''}`}>
```

### 2. CSS Slide-In Animation

```css
.about-image {
  opacity: 0;
  transform: translateX(-50px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.about.visible .about-image {
  opacity: 1;
  transform: translateX(0);
}
```

---

## ✅ Features Implemented

| Feature | Description |
|---------|-------------|
| Scroll animation | Elements slide in when visible |
| Experience badge | Floating "10+ Years" indicator |
| Specs grid | 2x2 grid of project details |
| Decorative circles | Background visual elements |
| Responsive layout | Stacks on mobile |

---

## 💡 Test Your Understanding

1. What is `IntersectionObserver` and why use it?
2. What does `threshold: 0.2` mean?
3. Why use `cubic-bezier` for transitions?

---

[← Previous: Step 7](step7.md) | [Back to Main](../PROJECT_START.md) | [Next: Step 9 →](step9.md)
