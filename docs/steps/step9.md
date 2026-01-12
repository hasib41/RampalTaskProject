# 📚 STEP 9: Building the Stats/Facts Section

## 🎯 What Are We Doing?

Creating a **premium stats section** with:
- Animated number counters with easing
- Glassmorphism card design
- Staggered entrance animations
- Hover effects with decorative line

---

## 🧠 How Does It Work?

### 1. Eased Counter Animation

```tsx
const animateCounters = () => {
  const duration = 2500;
  const steps = 80;
  let step = 0;

  const timer = setInterval(() => {
    step++;
    const progress = step / steps;
    // Cubic ease-out: starts fast, decelerates
    const easeOut = 1 - Math.pow(1 - progress, 3);
    setCounts(STATS_DATA.map((stat) => 
      Math.floor(stat.value * easeOut)
    ));
    
    if (step >= steps) clearInterval(timer);
  }, duration / steps);
};
```

### 2. Glassmorphism CSS

```css
.stat-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

---

## ✅ Features Implemented

| Feature | Implementation |
|---------|---------------|
| Animated counters | setInterval + ease-out curve |
| Glassmorphism | backdrop-filter + transparent bg |
| Staggered animation | CSS transition-delay |
| Hover bottom line | scaleX transform |
| Section header | "Numbers That Speak" title |

---

## 💡 Test Your Understanding

1. What does `1 - Math.pow(1 - progress, 3)` calculate?
2. What CSS property creates the glass effect?
3. Why use `hasAnimated.current` ref?

---

[← Previous: Step 8](step8.md) | [Back to Main](../PROJECT_START.md) | [Next: Step 10 →](step10.md)
