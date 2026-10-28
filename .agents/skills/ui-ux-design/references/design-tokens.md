# UI Design Tokens & Component Reference

This reference provides ready-to-use Vanilla CSS custom properties and core component classes for the AWS AI CV Screening Portal.

---

## 1. CSS Custom Properties (Theme Tokens)

```css
:root {
  /* Surface & Background (Light Mode) */
  --color-bg-canvas: hsl(210, 20%, 98%);
  --color-bg-surface: hsl(0, 0%, 100%);
  --color-bg-elevated: hsl(210, 25%, 96%);
  --color-border-subtle: hsl(215, 16%, 88%);
  --color-border-strong: hsl(215, 16%, 76%);

  /* Typography Colors */
  --color-text-primary: hsl(222, 47%, 11%);
  --color-text-secondary: hsl(215, 16%, 40%);
  --color-text-muted: hsl(215, 12%, 58%);
  --color-text-inverse: hsl(0, 0%, 100%);

  /* Brand Accents */
  --color-brand-primary: hsl(221, 83%, 53%);
  --color-brand-primary-hover: hsl(221, 83%, 45%);
  --color-brand-subtle: hsl(221, 100%, 96%);

  /* Semantic Feedback & Statuses */
  --color-status-success: hsl(142, 71%, 38%);
  --color-status-success-bg: hsl(142, 60%, 95%);
  --color-status-warning: hsl(38, 92%, 44%);
  --color-status-warning-bg: hsl(38, 90%, 95%);
  --color-status-danger: hsl(0, 72%, 51%);
  --color-status-danger-bg: hsl(0, 80%, 96%);
  --color-status-info: hsl(199, 89%, 48%);
  --color-status-info-bg: hsl(199, 90%, 96%);

  /* AI Accent (Distinctive Cyan/Indigo) */
  --color-ai-glow: hsl(262, 83%, 58%);
  --color-ai-surface: hsl(262, 80%, 98%);
  --color-ai-border: hsl(262, 60%, 85%);

  /* Spacing Scale (8pt Grid) */
  --space-2xs: 4px;
  --space-xs: 8px;
  --space-sm: 12px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;

  /* Typography Scale */
  --font-family-sans: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-family-mono: 'JetBrains Mono', 'Fira Code', monospace;
  --font-size-xs: 0.75rem;     /* 12px */
  --font-size-sm: 0.875rem;    /* 14px */
  --font-size-base: 1rem;      /* 16px */
  --font-size-lg: 1.125rem;    /* 18px */
  --font-size-xl: 1.25rem;     /* 20px */
  --font-size-2xl: 1.5rem;     /* 24px */
  --font-size-3xl: 1.875rem;   /* 30px */

  /* Radius & Shadows */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -2px rgba(0, 0, 0, 0.04);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.03);

  /* Transitions */
  --transition-fast: 150ms cubic-bezier(0.16, 1, 0.3, 1);
  --transition-normal: 250ms cubic-bezier(0.16, 1, 0.3, 1);
}

/* Dark Mode Tokens (Obsidian Glass) */
[data-theme="dark"] {
  --color-bg-canvas: hsl(222, 47%, 7%);
  --color-bg-surface: hsl(222, 40%, 11%);
  --color-bg-elevated: hsl(222, 35%, 15%);
  --color-border-subtle: hsl(217, 30%, 18%);
  --color-border-strong: hsl(217, 25%, 28%);

  --color-text-primary: hsl(210, 40%, 98%);
  --color-text-secondary: hsl(215, 20%, 75%);
  --color-text-muted: hsl(215, 15%, 52%);
  --color-text-inverse: hsl(222, 47%, 7%);

  --color-brand-primary: hsl(217, 91%, 60%);
  --color-brand-primary-hover: hsl(217, 91%, 68%);
  --color-brand-subtle: hsl(222, 47%, 16%);

  --color-ai-glow: hsl(263, 70%, 65%);
  --color-ai-surface: hsl(263, 40%, 14%);
  --color-ai-border: hsl(263, 50%, 30%);

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 12px 24px rgba(0, 0, 0, 0.5);
}
```

---

## 2. Reusable Layout Patterns

### Dual-Pane Review Workspace (50/50 Split)
```css
.review-workspace {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-lg);
  height: calc(100vh - 64px);
  overflow: hidden;
  padding: var(--space-md);
}

.pane-candidate-cv {
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-lg);
  overflow-y: auto;
  box-shadow: var(--shadow-sm);
}

.pane-ai-rubric {
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-lg);
  overflow-y: auto;
  padding: var(--space-lg);
}

@media (max-width: 1024px) {
  .review-workspace {
    grid-template-columns: 1fr;
    height: auto;
    overflow: visible;
  }
}
```
