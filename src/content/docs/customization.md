---
title: "Customization & Branding"
description: "Customize colors, fonts, components, and branding for your organization"
icon: "sparkles"
order: 4
---

Learn how to customize this framework to match your brand identity and requirements.

## Branding Configuration

### Update Site Metadata

Edit `src/config/site.ts`:

```typescript
export const siteConfig = {
  // Site name
  name: 'Your Company Documentation',
  
  // Meta description
  description: 'Complete documentation for your product',
  
  // Primary domain
  url: 'https://docs.yourcompany.com',
  
  // Organization info
  author: 'Your Company Name',
  
  // Links in footer/header
  links: {
    github: 'https://github.com/yourcompany',
    website: 'https://yourcompany.com',
    contact: 'support@yourcompany.com',
  }
};
```

## Color Customization

### Change Brand Colors

Edit `src/styles/global.css`:

```css
:root {
  /* Primary brand color */
  --brand: #0066cc;
  
  /* Hover/active state */
  --brand-hover: #004499;
  
  /* Light background variant */
  --brand-contrast: #f8fbff;
  
  /* Text colors */
  --text-primary: #1d1d1f;
  --text-secondary: #3a3a3e;
  
  /* Borders and dividers */
  --border-subtle: #e8e8ed;
  
  /* Background */
  --app-bg: #f5f5f7;
  --surface: #ffffff;
  --surface-muted: #fbfbfd;
}
```

### Color Palette Example

**Technology Brand:**
```css
--brand: #007acc;        /* Blue */
--brand-hover: #005a9e;  /* Darker blue */
```

**Creative Brand:**
```css
--brand: #ff6b6b;        /* Red */
--brand-hover: #ee5a52;  /* Darker red */
```

**Healthcare Brand:**
```css
--brand: #00a854;        /* Green */
--brand-hover: #007d3a;  /* Darker green */
```

## Typography Customization

### Change Fonts

The framework uses **Inter** by default. To use a different font:

1. **Install new font from Fontsource:**

```bash
npm install @fontsource/roboto    # Example: Roboto
```

2. **Update `src/layouts/DocsLayout.astro`:**

```typescript
// Replace:
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';

// With:
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/600.css';
```

3. **Update `src/styles/global.css`:**

```css
:root {
  --font-sans: 'Roboto', sans-serif;
  --font-display: 'Roboto', sans-serif;
}
```

### Adjust Type Scale

Edit the font size clamp in `src/styles/global.css`:

```css
body {
  /* Default: 15.5px to 17px responsive */
  font-size: clamp(15.5px, 0.5vw + 14px, 17px);
  
  /* More dramatic: */
  font-size: clamp(14px, 1vw + 12px, 18px);
  
  /* More subtle: */
  font-size: clamp(15px, 0.3vw + 15px, 16px);
}
```

## Layout & Spacing

### Adjust Sidebar Width

In `src/layouts/DocsLayout.astro`, find the sidebar:

```astro
<!-- Change w-72 (288px) to your preferred width -->
<aside class="fixed inset-y-0 left-0 z-30 hidden w-80 ...">
                                                    ^^^
<!-- Width options: w-64 (256px), w-72 (288px), w-80 (320px) -->
```

Right sidebar:

```astro
<!-- Change w-64 (256px) to your preferred width -->
<aside class="fixed inset-y-0 right-0 z-30 hidden w-64 ...">
                                                    ^^^
```

### Adjust Content Max Width

In `src/layouts/DocsLayout.astro`:

```astro
<div class="mx-auto w-full max-w-5xl ...">
                          ^^^^^^^
  <!-- Options: max-w-3xl, max-w-4xl, max-w-5xl, max-w-6xl, max-w-7xl -->
</div>
```

## Logo & Images

### Add Custom Logo

1. **Place logo in `src/components/` or `src/assets/`**

2. **Update the sidebar header in `src/layouts/DocsLayout.astro`:**

```astro
<!-- Current logo: -->
<svg class="h-8 w-8 text-blue-600" ...>
  <path ... />
</svg>

<!-- Replace with: -->
<img 
  src="/logo.png" 
  alt="Your Logo" 
  class="h-8 w-8 object-contain" 
/>
```

### Update Favicon

1. **Place your favicon in `public/favicon.ico`**

2. **Update `src/layouts/DocsLayout.astro` head:**

```astro
<head>
  <link rel="icon" href="/favicon.ico" type="image/x-icon" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
</head>
```

## Navigation Icons

### Change Icon Set

Edit icon mapping in `src/layouts/DocsLayout.astro`:

```typescript
const icons: Record<string, string> = {
  book: `<svg>...</svg>`,
  rocket: `<svg>...</svg>`,
  sparkles: `<svg>...</svg>`,
  // Add more:
  settings: `<svg>...</svg>`,
  users: `<svg>...</svg>`,
};
```

Use in front matter:

```yaml
---
title: "Settings"
icon: "settings"
---
```

## Animation Customization

### Adjust Animation Duration

Edit GSAP animations in `src/layouts/DocsLayout.astro`:

```javascript
gsap.from('.js-doc-topbar', {
  y: -12,
  opacity: 0,
  duration: 0.55,    // Faster (0.3) or slower (1.0)
  ease: 'power2.out' // Try: 'power1.out', 'sine.out', 'back.out'
});
```

### Disable Animations

For users with `prefers-reduced-motion`, animations are already disabled.

To disable all animations, comment out the animation scripts in `src/layouts/DocsLayout.astro`.

## CSS Classes

### Custom Button Styles

Edit `src/styles/global.css`:

```css
.hig-button-primary {
  /* Your custom styles */
  background: var(--brand);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;  /* Change roundness */
  font-weight: 500;
}
```

### Custom Card Styles

```css
.hig-card {
  background: white;
  border-radius: 12px;  /* Change this */
  border: 1px solid var(--border-subtle);
  padding: 1.5rem;
}
```

## Dark Mode (Optional)

To add dark mode support, extend `src/styles/global.css`:

```css
@media (prefers-color-scheme: dark) {
  :root {
    color-scheme: dark;
    --app-bg: #1d1d1f;
    --surface: #2d2d2f;
    --text-primary: #f5f5f7;
    --text-secondary: #a1a1a6;
    --border-subtle: #424245;
    --brand: #0084ff;
  }
}
```

And update `src/styles/global.css` base styles to use CSS variables.

## Tailwind Configuration

Extend Tailwind configuration in `tailwind.config.cjs`:

```javascript
export default {
  theme: {
    extend: {
      colors: {
        brand: 'var(--brand)',
      },
      fontFamily: {
        sans: 'var(--font-sans)',
        display: 'var(--font-display)',
      },
      borderRadius: {
        '2xl': '12px',
      }
    }
  }
}
```

## Search Customization

### Update Search Placeholder

In `src/layouts/DocsLayout.astro`:

```astro
<input
  placeholder="Search documentation..."
  <!-- Change above text -->
/>
```

### Disable Search

Remove the search input section or add `hidden` class:

```astro
<div class="hidden">
  <!-- Search input -->
</div>
```

## Analytics Integration

Add your analytics script to `src/layouts/DocsLayout.astro` head:

```astro
<head>
  <!-- ... existing head content ... -->
  
  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_ID');
  </script>
</head>
```

## Metadata

### Update SEO

Edit `src/layouts/DocsLayout.astro`:

```astro
<meta name="description" content={description} />
<meta name="keywords" content="your, keywords, here" />
<meta name="og:title" content={title} />
<meta name="og:description" content={description} />
<meta name="og:image" content="https://yoursite.com/og-image.png" />
```

## Theme Presets

### Professional (Default)
- Brand: Blue (#0066cc)
- Font: Inter
- Borders: Subtle gray
- Spacing: Generous

### Minimal

```css
:root {
  --brand: #000000;
  --border-subtle: #f0f0f0;
  --app-bg: #ffffff;
}
```

### Vibrant

```css
:root {
  --brand: #ff6b35;
  --brand-hover: #e85a2a;
  --brand-contrast: #fff8f3;
}
```

## Tips & Best Practices

1. **Test across browsers** - Verify your changes work on Chrome, Safari, Firefox
2. **Check mobile** - Use DevTools to test responsive design
3. **Use CSS variables** - Keep consistency by using `--brand`, `--text-primary`, etc.
4. **Document changes** - Add notes about your customizations
5. **Version control** - Commit customization changes to Git

## Next Steps

- [Create your first documentation page](/docs/creating-documentation)
- [Deploy your customized site](/docs/deployment)
- [Learn about security](/docs/security)
