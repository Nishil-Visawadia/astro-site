---
title: "Troubleshooting & FAQ"
description: "Common issues, solutions, and frequently asked questions"
icon: "life-buoy"
order: 7
---

Find solutions to common problems and answers to frequently asked questions.

## Troubleshooting Guide

### Build Failures

#### ❌ Error: `Cannot find module '@tailwindcss/vite'`

**Cause**: Missing dev dependencies or incomplete installation

**Solution**:

```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### ❌ Error: `Node version must be >= 22.12.0`

**Cause**: Incorrect Node.js version

**Solution**:

```bash
# Check current version
node --version

# Using nvm (recommended)
nvm install 22.12.0
nvm use 22.12.0

# Or download from nodejs.org
```

#### ❌ Error: `ENOENT: no such file or directory, open 'dist/...'`

**Cause**: Build artifacts missing

**Solution**:

```bash
npm run check   # Verify no errors
npm run build   # Full rebuild
npm run preview # Test locally
```

### Development Server Issues

#### ❌ Error: `Port 3000 already in use`

**Cause**: Another process using the port

**Solution**:

```bash
# Use different port
npm run dev -- --port 3001

# Or kill existing process
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux:
lsof -i :3000
kill -9 <PID>
```

#### ❌ Hot reload not working

**Cause**: File watcher limit exceeded

**Solution**:

```bash
# macOS (increase file watcher limit)
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p

# Or restart dev server
npm run dev
```

#### ❌ Slow development server

**Cause**: Many files or large dependencies

**Solution**:

- Check for large `node_modules` folder
- Use SSD instead of HDD
- Reduce number of watched files
- Restart VS Code

### Content Issues

#### ❌ Page doesn't appear in navigation

**Cause**: Missing front matter or incorrect syntax

**Solution**:

```markdown
---
title: "My Page"           # Required
description: "About page"  # Required
order: 3                   # Required (number)
icon: "book-open"          # Optional
---
```

Verify:

- Front matter between `---` markers
- All required fields present
- Proper YAML syntax (no missing colons)

#### ❌ Search not indexing new pages

**Cause**: Pagefind not ran or stale cache

**Solution**:

```bash
# Full rebuild with search
npm run build   # Includes postbuild Pagefind step

# Or manually run Pagefind
npx pagefind --site dist
```

#### ❌ Code blocks not displaying correctly

**Cause**: Markdown syntax error

**Solution**:

```markdown
# Incorrect (missing language)
\`\`\`
code here
\`\`\`

# Correct
\`\`\`javascript
code here
\`\`\`
```

### Navigation Issues

#### ❌ Links returning 404

**Cause**: Incorrect route or page not found

**Solution**:

- Verify file exists in `src/content/docs/`
- Check path is correct
- Use exact filenames (case-sensitive on Linux)

**Examples**:

```markdown
# Correct (using slug)
[Link](/docs/getting-started)

# Correct (using filename)
[Link](/docs/installation)

# Incorrect
[Link](/docs/getting_started)  # Wrong separator
[Link](/docs/Getting-Started)  # Wrong case
```

#### ❌ Active navigation link not highlighting

**Cause**: Route mismatch

**Solution**:

- Ensure current URL matches link exactly
- Check slug field in front matter
- Verify no trailing slashes in navigation

### Styling Issues

#### ❌ Sidebar text blurry or hard to read

**Cause** (Fixed in this update):

- Missing z-index
- Backdrop blur effects

**Solution**: Already fixed in DocsLayout.astro

#### ❌ Mobile layout broken

**Cause**: Responsive classes not working

**Solution**:

- Verify Tailwind CSS processed correctly
- Check viewport meta tag in head
- Clear browser cache

#### ❌ Colors not changing after edit

**Cause**: CSS cache or Tailwind rebuild needed

**Solution**:

```bash
# Restart dev server
npm run dev

# Or hard refresh browser
Ctrl+Shift+R (Windows/Linux)
Cmd+Shift+R (macOS)
```

### Deployment Issues

#### ❌ Build fails in CI/CD

**Cause**: Environment differences

**Solution**:

```yaml
# Ensure Node version matches
- uses: actions/setup-node@v4
  with:
    node-version: '22.12.0'
```

#### ❌ Site works locally but not on host

**Cause**: Configuration or environment mismatch

**Solution**:

- Check `astro.config.mjs` site URL
- Verify environment variables set
- Test with `npm run build && npm run preview`

#### ❌ Docker build fails

**Cause**: Missing dependencies or incorrect base image

**Solution**:

```bash
# Rebuild from scratch
docker build --no-cache -t docs-site:latest .

# Check logs
docker build -t docs-site:latest . 2>&1 | tail -20
```

#### ❌ Search works locally but not on production

**Cause**: Pagefind index not generated in build

**Solution**:

```json
{
  "scripts": {
    "postbuild": "pagefind --site dist"
  }
}
```

Verify in `package.json`.

## Frequently Asked Questions

### Q: Can I use a different framework?

**A**: This is built on Astro. You can:

- Modify components to use Vue/React/Svelte
- Use Astro's integrations for other frameworks
- Replace styling with CSS-in-JS solution
- See [Astro docs](https://docs.astro.build/guides/integrations-guide/)

### Q: How do I add user authentication?

**A**: Static sites don't support traditional auth, but you can:

- Use GitHub Pages private deployments
- Add password protection via hosting provider
- Use third-party auth service (Auth0, Supabase)
- Serve behind authentication proxy

### Q: Can I use a database?

**A**: Not directly (static site). Alternatives:

- Use headless CMS (Contentful, Sanity)
- Fetch data at build time
- Use API for dynamic content
- See [Astro data fetching](https://docs.astro.build)

### Q: How do I add comments/discussions?

**A**: Use third-party solutions:

- Giscus (GitHub Discussions)
- Utterances (GitHub Issues)
- Disqus
- Commento

### Q: Can I monitor analytics?

**A**: Yes, multiple options:

- Google Analytics
- Plausible
- Fathom
- Cloudflare Analytics

### Q: How do I handle blog posts?

**A**: Use content collections:

1. Create `src/content/blog/` directory
2. Add `.md` files with front matter
3. Query with `getCollection('blog')`
4. Create dynamic routes

### Q: Can I preview changes before deploying?

**A**: Yes:

```bash
npm run build    # Build for production
npm run preview  # Preview locally
# Visit http://localhost:3000
```

### Q: How do I redirect old URLs?

**A**: Using redirects middleware:

```typescript
// src/middleware.ts
export const onRequest = defineMiddleware((context, next) => {
  const oldRoutes: Record<string, string> = {
    '/old-page': '/docs/new-page',
    '/docs/v1/api': '/docs/api-reference',
  };
  
  if (context.url.pathname in oldRoutes) {
    return context.redirect(oldRoutes[context.url.pathname]);
  }
  
  return next();
});
```

### Q: How do I optimize for SEO?

**A**: Astro handles most automatically:

- Semantic HTML generated
- Meta tags for each page
- Sitemap at `/sitemap.xml`
- Open Graph tags (add to layout)

Add to `src/layouts/DocsLayout.astro`:

```astro
<meta name="og:title" content={title} />
<meta name="og:description" content={description} />
<meta name="og:image" content="https://yoursite.com/og-image.png" />
```

### Q: How do I handle 404 errors?

**A**: Create `src/pages/404.astro`:

```astro
---
import DocsLayout from '../layouts/DocsLayout.astro';
---

<DocsLayout title="Page Not Found" description="404 - Page not found">
  <h1>Page Not Found</h1>
  <p>The page you're looking for doesn't exist.</p>
  <a href="/docs">Back to documentation</a>
</DocsLayout>
```

### Q: How often should I update dependencies?

**A**: Best practices:

- Monthly security updates
- Quarterly feature updates
- Use `npm outdated` to check
- Test thoroughly before deploying

```bash
# Update patch versions (safe)
npm update

# Update major versions (requires testing)
npm install package@latest
```

### Q: How do I backup my documentation?

**A**:

- Use Git for version control (recommended)
- Export as static files from `dist/`
- Use hosting provider backup features
- Set up automated backups

```bash
# Backup current state
git tag v1.0.0-backup
git push origin v1.0.0-backup
```

### Q: Can I use custom domains?

**A**: Yes, all hosting providers support it:

- Update DNS records
- Set custom domain in provider settings
- Enable HTTPS/SSL certificate
- See [Deployment guide](/docs/deployment)

### Q: How do I measure performance?

**A**: Use multiple tools:

```bash
# Lighthouse audit
npm install -D lighthouse-ci

# Check build size
du -sh dist/
```

Tools:

- Google Lighthouse
- WebPageTest
- GTmetrix
- Vercel Analytics

### Q: How do I handle image optimization?

**A**: Astro optimizes automatically:

```astro
---
import { Image } from 'astro:assets';
import myImage from '../assets/image.png';
---

<Image src={myImage} alt="Description" />
```

### Q: Can I use markdown extensions?

**A**: Yes, via Remark plugins:

In `astro.config.mjs`:

```javascript
markdown: {
  remarkPlugins: [
    'remark-gfm',              // Tables, strikethrough
    'remark-math',             // Math equations
  ],
}
```

## Getting Help

**Still stuck?**

1. **Check documentation** - Search this guide
2. **Review examples** - Check existing pages
3. **GitHub Issues** - Search/open issue
4. **Community** - Ask in GitHub Discussions
5. **Stack Overflow** - Tag with `astro`, `tailwindcss`

**Reporting bugs:**

- Minimal reproduction steps
- Expected vs actual behavior
- Error messages/logs
- Environment info (Node version, OS)

---

**Most issues are solved by**:

1. Reading the error message carefully
2. Clearing cache: `rm -rf node_modules package-lock.json && npm install`
3. Restarting dev server: `npm run dev`
4. Checking the [Astro docs](https://docs.astro.build)
