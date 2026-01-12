# 📚 STEP 6: Building the Header & Navigation

## 🎯 What Are We Doing?

We're building a **professional, fully-featured header** with:
- Scroll-based transparency effect
- Responsive mobile menu (hamburger)
- Smooth animations
- Accessibility features

---

## 🤔 Why These Features?

| Feature | Why It's Important |
|---------|-------------------|
| **Scroll Effect** | Shows user they've scrolled, adds polish |
| **Mobile Menu** | Essential for 50%+ mobile users |
| **Hover Animations** | Visual feedback, feels responsive |
| **Accessibility** | Required for all users, SEO benefits |

---

## 🧠 How Does It Work?

### 1. Scroll Detection (useEffect + useState)

```tsx
const [isScrolled, setIsScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

// Apply class conditionally
<header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
```

**What's happening:**
1. `useState` tracks if page is scrolled
2. `useEffect` adds scroll listener on mount
3. Cleanup function removes listener (prevents memory leaks)
4. Class changes based on scroll position

### 2. Mobile Menu State

```tsx
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

// Toggle button
<button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>

// Body scroll lock when open
useEffect(() => {
  document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
}, [isMobileMenuOpen]);
```

### 3. CSS Animations

```css
/* Hamburger to X animation */
.mobile-menu-toggle.active .hamburger-line:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.mobile-menu-toggle.active .hamburger-line:nth-child(2) {
  opacity: 0;
}
.mobile-menu-toggle.active .hamburger-line:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* Staggered menu item animation */
.mobile-menu.open li:nth-child(1) { transition-delay: 0.1s; }
.mobile-menu.open li:nth-child(2) { transition-delay: 0.15s; }
```

---

## ✅ Features Implemented

| Feature | Status |
|---------|--------|
| Fixed header | ✅ |
| Scroll transparency effect | ✅ |
| Desktop navigation | ✅ |
| Mobile hamburger menu | ✅ |
| Hamburger → X animation | ✅ |
| Staggered menu animations | ✅ |
| Body scroll lock | ✅ |
| Hover underline effect | ✅ |
| Login button animation | ✅ |
| Responsive breakpoints | ✅ |
| Accessibility (aria-label) | ✅ |

---

## 💡 Test Your Understanding

1. Why do we use `useEffect` cleanup for event listeners?
2. What is the purpose of `backdrop-filter: blur()`?
3. How does the hamburger → X animation work?
4. Why do we lock body scroll when mobile menu is open?

---

[← Previous: Step 5](step5.md) | [Back to Main](../PROJECT_START.md) | [Next: Step 7 →](step7.md)
