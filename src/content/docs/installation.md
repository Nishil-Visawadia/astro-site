---
title: "Installation & Setup"
description: "Complete step-by-step guide to install and configure the documentation framework"
icon: "rocket"
order: 1.5
---

This guide covers everything you need to install and set up this documentation framework for your project.

## System Requirements

Before you begin, ensure your system has:

- **Node.js**: Version 22.12.0 or higher (required for Astro 6 compatibility)
- **npm**: Version 10.x or higher (or equivalent package manager like yarn/pnpm)
- **Git**: For version control
- **Disk Space**: At least 500MB for dependencies
- **RAM**: Minimum 2GB recommended

Check your versions:
```bash
node --version    # Should be v22.12.0 or higher
npm --version     # Should be v10.x or higher
git --version     # Should be installed
```

## Installation Steps

### 1. Clone or Copy the Framework

**Option A: Clone from repository**
```bash
git clone https://github.com/your-org/astro-site.git your-docs
cd your-docs
```

**Option B: Copy as template**
```bash
cp -r astro-site your-docs
cd your-docs
```

### 2. Install Dependencies

```bash
npm install
```

This command will:
- Download all required packages
- Install Astro, Tailwind CSS, GSAP, and other dependencies
- Create a `node_modules` folder
- Generate `package-lock.json` (don't delete this!)

**Expected output:**
```
up to date, audited X packages in Xs
```

### 3. Verify Installation

Run the type checker and build validator:

```bash
npm run check
```

You should see:
```
Checking types...
0 errors, 0 warnings, 0 hints
✓ Build validation complete
```

## Configuration

### 1. Update Site Configuration

Edit `src/config/site.ts`:

```typescript
export const siteConfig = {
  name: 'Your Company Docs',
  description: 'Your documentation platform',
  url: 'https://docs.yourcompany.com',
  author: 'Your Company',
  links: {
    github: 'https://github.com/yourorg',
    website: 'https://yourcompany.com',
    contact: 'docs@yourcompany.com',
  }
};
```

### 2. Update Astro Configuration

Edit `astro.config.mjs` to customize site options:

```javascript
export default defineConfig({
  site: 'https://docs.yourcompany.com',
  integrations: [
    tailwind({
      nesting: true,
    }),
  ],
  // ... other config
});
```

### 3. Customize Branding (Optional)

Edit `src/styles/global.css` to change colors:

```css
:root {
  --brand: #0066cc;        /* Primary brand color */
  --brand-hover: #004499;  /* Hover state */
  --brand-contrast: #f8fbff; /* Contrast background */
}
```

## Development Server

### Start the Development Server

```bash
npm run dev
```

Output:
```
astro dev
  ▶ Starting dev server...
  ▶ Local    http://localhost:3000/
  ▶ Network  use --host to expose
```

### Access Your Site

- **Local**: http://localhost:3000
- **From network**: Use `npm run dev -- --host` to expose to your network

### Available Development Commands

| Command           | Purpose                                  |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start development server with hot reload |
| `npm run build`   | Build for production                     |
| `npm run preview` | Preview production build locally         |
| `npm run check`   | Run TypeScript and Astro checks          |

### Hot Reloading

Any changes to:
- Markdown files in `src/content/docs/`
- React/Astro components in `src/components/`
- Styles in `src/styles/`
- Configuration files

...will automatically refresh in your browser.

## Next Steps

After installation:

1. **Create Your First Page** - See [Creating Documentation](/docs/creating-documentation)
2. **Customize Branding** - See [Customization Guide](/docs/customization)
3. **Add Your Content** - Start writing in `src/content/docs/`
4. **Deploy** - See [Deployment Guide](/docs/deployment)

## Troubleshooting Installation Issues

### Node Version Mismatch

**Error**: `Error: Node version must be >= 22.12.0`

**Solution**: Update Node.js
```bash
# Using nvm (recommended)
nvm install 22.12.0
nvm use 22.12.0

# Or download from nodejs.org
```

### npm Install Failures

**Error**: `npm ERR! code ERR_SOCKET_HANG_UP`

**Solution**: Clear npm cache
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use

**Error**: `Error: listen EADDRINUSE: address already in use :::3000`

**Solution**: Use a different port
```bash
npm run dev -- --port 3001
```

Or kill the process using port 3000:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :3000
kill -9 <PID>
```

### Build Failures

**Error**: `error: Cannot find module '@tailwindcss/vite'`

**Solution**: Reinstall dependencies
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

## Getting Help

- **Documentation**: Check other guides in this documentation
- **GitHub Issues**: https://github.com/your-org/astro-site/issues
- **Astro Docs**: https://docs.astro.build
- **Community**: Join community Slack or Discord

## What's Included

This framework includes:

✅ **Astro 6.1.9** - Modern static site builder
✅ **Tailwind CSS 4.1.14** - Utility-first CSS
✅ **GSAP 3.15.0** - Animation library
✅ **Pagefind 1.5.2** - Static search
✅ **TypeScript** - Type safety
✅ **GitHub Actions** - CI/CD workflows
✅ **Docker** - Container support
✅ **Responsive Design** - Mobile-first approach
✅ **Apple HIG Design System** - Professional look

Ready to create your first page? Head over to [Creating Documentation](/docs/creating-documentation).
