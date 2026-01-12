# 📚 STEP 5: Creating the Project Structure

## 🎯 What Are We Doing?

We are setting up the **folder structure** and creating **skeleton components** for our power company website. This is the foundation that all future code will build upon.

**Important Change**: We switched from JavaScript to **TypeScript** for better type safety and developer experience!

---

## 🤔 Why Are We Doing This?

### Why TypeScript?
| JavaScript | TypeScript |
|------------|------------|
| No type checking | Catches errors at compile time |
| Runtime errors | Errors shown in editor |
| Harder to refactor | Easy refactoring with IDE support |
| Less documentation | Types serve as documentation |

### Why This Folder Structure?
```
src/
├── components/        # Reusable UI pieces
│   ├── common/        # Used everywhere (Button, Card)
│   ├── layout/        # Page structure (Header, Footer)
│   └── sections/      # Homepage sections
├── pages/             # Full page components
└── index.css          # Global styles
```

**Best Practice**: Separate components by their PURPOSE, not just by name.

---

## 🧠 How Does It Work?

### Barrel Exports (index.ts)

Each folder has an `index.ts` file that exports all components:

```typescript
// components/common/index.ts
export { default as Button } from './Button';
export { default as Card } from './Card';
```

**Why?** Cleaner imports:
```typescript
// Instead of:
import Button from './components/common/Button';
import Card from './components/common/Card';

// We can do:
import { Button, Card } from './components/common';
```

### TypeScript Interfaces

We define the "shape" of data components receive:

```typescript
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  onClick?: () => void;
}
```

**What this means:**
- `children` is required (no `?`)
- `variant` is optional (has `?`), can only be specific values
- `onClick` is optional, must be a function

---

## 📁 Complete Project Structure

```
frontend/src/
├── components/
│   ├── common/
│   │   ├── Button.tsx     # Reusable button with variants
│   │   ├── Button.css
│   │   ├── Card.tsx       # Reusable card container
│   │   ├── Card.css
│   │   └── index.ts       # Barrel export
│   │
│   ├── layout/
│   │   ├── Header.tsx     # Fixed navigation header
│   │   ├── Header.css
│   │   ├── Footer.tsx     # Multi-column footer
│   │   ├── Footer.css
│   │   └── index.ts
│   │
│   └── sections/
│       ├── HeroSection.tsx    # Full-screen hero
│       ├── HeroSection.css
│       ├── AboutSection.tsx   # About with project details
│       ├── AboutSection.css
│       ├── StatsSection.tsx   # Animated counters
│       ├── StatsSection.css
│       └── index.ts
│
├── pages/
│   ├── HomePage.tsx       # Assembles all sections
│   ├── HomePage.css
│   └── index.ts
│
├── App.tsx                # Entry component
└── index.css              # Global styles & CSS variables
```

---

## 🎨 CSS Variables (Design System)

We created CSS variables for consistent styling:

```css
:root {
  /* Colors */
  --color-primary: #28a745;
  --color-secondary: #20c997;
  --color-dark: #1a1a2e;
  
  /* Gradients */
  --gradient-primary: linear-gradient(135deg, #28a745, #20c997);
  
  /* Spacing */
  --spacing-md: 16px;
  --spacing-lg: 24px;
  
  /* Shadows */
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.12);
}
```

**Why?** Change colors in ONE place, affects EVERYWHERE.

---

## ✅ Step 5 Checklist

- [x] Understood why we use TypeScript
- [x] Created component folder structure
- [x] Created common components (Button, Card)
- [x] Created layout components (Header, Footer)
- [x] Created section components (Hero, About, Stats)
- [x] Created HomePage that assembles all sections
- [x] Created global CSS with design variables
- [x] Build verified successfully

---

## 💡 Test Your Understanding

1. What is a "barrel export" and why do we use it?
2. What does the `?` mean in TypeScript interfaces?
3. Why do we use CSS variables instead of hardcoded colors?
4. What is the difference between `components/common/` and `components/sections/`?

---

[← Previous: Step 4](step4.md) | [Back to Main](../PROJECT_START.md) | [Next: Step 6 →](step6.md)
