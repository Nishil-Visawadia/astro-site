---
title: "Deployment & Hosting"
description: "Deploy your documentation to production with various hosting options"
icon: "cloud-upload"
order: 5
---

This guide covers deploying your documentation to production using various hosting platforms and methods.

## Before Deployment

### 1. Verify Everything Works

```bash
# Run type checker
npm run check

# Build for production
npm run build

# Preview production build locally
npm run preview
```

You should see:

- Zero errors/warnings from type checker
- Successful build output with Pagefind indexing
- Site loads correctly on <http://localhost:3000>

### 2. Test Production Build Locally

```bash
npm run build
npm run preview
```

Navigate to <http://localhost:3000> and verify:

- All pages load correctly
- Navigation works
- Search indexes successfully
- Animations work (or gracefully degrade)

## Deployment Options

## Option 1: Vercel (Recommended for Beginners)

Vercel is the easiest option with automatic deployments.

### Setup

1. **Push your code to GitHub**

    ```bash
    git add .
    git commit -m "Initial documentation site"
    git push origin main
    ```

2. **Create Vercel account**

   - Go to <https://vercel.com>
   - Click "Sign Up"
   - Choose "Continue with GitHub"

3. **Import project**
   - Click "New Project"
   - Select your repository
   - Framework: Astro (auto-detected)
   - Click "Deploy"

### Auto-Deployment

After initial setup, every push to `main` automatically:

- Builds your site
- Runs tests
- Deploys to production
- Creates preview URLs for PRs

### Custom Domain

1. In Vercel dashboard → Project Settings
2. Click "Domains"
3. Enter your domain (e.g., docs.yourcompany.com)
4. Follow DNS setup instructions

## Option 2: GitHub Pages (Free)

Easiest free option for open source.

### Setup on Github Pages

1. **Update `astro.config.mjs`:**

    ```javascript
    export default defineConfig({
      site: 'https://yourname.github.io/repository-name',
      // ... rest of config
    });
    ```

2. **Create deployment workflow in `.github/workflows/deploy.yml`:**

    ```yaml
    name: Deploy to GitHub Pages

    on:
      push:
        branches: [main]
      workflow_dispatch:

    permissions:
      contents: read
      pages: write
      id-token: write

    jobs:
      build:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v4
      
          - name: Setup Node
            uses: actions/setup-node@v4
            with:
              node-version: '22.12.0'
      
          - name: Install dependencies
            run: npm ci
      
          - name: Build
            run: npm run build
      
          - name: Upload artifact
            uses: actions/upload-pages-artifact@v3
            with:
              path: './dist'
  
      deploy:
        needs: build
        runs-on: ubuntu-latest
        environment:
          name: github-pages
          url: ${{ steps.deployment.outputs.page_url }}
        steps:
          - name: Deploy to GitHub Pages
            id: deployment
            uses: actions/deploy-pages@v2
    ```

3. **Enable GitHub Pages**

   - Repository → Settings → Pages
   - Source: Deploy from a branch
   - Branch: gh-pages (auto-created by workflow)

## Option 3: Docker Deployment

For full control and self-hosting.

### Build Docker Image

```bash
# Build the image
docker build -t docs-site:latest .

# Test locally
docker run -p 8080:8080 docs-site:latest

# Visit http://localhost:8080
```

### Push to Docker Registry

```bash
# Login to registry
docker login ghcr.io

# Tag image
docker tag docs-site:latest ghcr.io/yourorg/docs-site:latest

# Push
docker push ghcr.io/yourorg/docs-site:latest
```

### Deploy to Your Server

```bash
# On your server
docker pull ghcr.io/yourorg/docs-site:latest
docker run -d -p 80:8080 ghcr.io/yourorg/docs-site:latest

# Or use docker-compose
docker-compose up -d
```

### Docker Compose

```yaml
version: '3.8'

services:
  docs:
    image: ghcr.io/yourorg/docs-site:latest
    ports:
      - "80:8080"
    restart: always
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/"]
      interval: 30s
      timeout: 10s
      retries: 3
```

## Option 4: Netlify

Powerful platform with free tier.

### Setup on Netlify

1. **Push to GitHub/GitLab/Bitbucket**

2. **Create Netlify account** at <https://netlify.com>

3. **Add new site**
   - Click "Add new site" → "Import an existing project"
   - Select your repository
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Click "Deploy site"

### Configuration File (Optional)

Create `netlify.toml`:

```toml
[build]
command = "npm run build"
publish = "dist"

[[redirects]]
from = "/*"
to = "/index.html"
status = 200

[functions]
directory = "netlify/functions"
```

## Option 5: AWS S3 + CloudFront

For enterprise deployments.

### Setup on AWS S3 + CloudFront

1. **Create S3 bucket**

   ```bash
   aws s3 mb s3://docs.yourcompany.com
   ```

2. **Upload build**

   ```bash
   npm run build
   aws s3 sync dist/ s3://docs.yourcompany.com/
   ```

3. **Create CloudFront distribution**

   - Origin: Your S3 bucket
   - Enable caching
   - Add SSL certificate

4. **Setup auto-deployment with GitHub Actions**

    ```yaml
    name: Deploy to AWS S3

    on:
      push:
        branches: [main]

    jobs:
      deploy:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v4
          - uses: actions/setup-node@v4
            with:
              node-version: '22.12.0'
          
          - run: npm ci
          - run: npm run build
          
          - uses: aws-actions/configure-aws-credentials@v4
            with:
              aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
              aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
              aws-region: us-east-1
          
          - run: aws s3 sync dist/ s3://docs.yourcompany.com/
    ```

## Environment-Specific Builds

### Staging Environment

Create `.env.staging`:

```cmd
PUBLIC_SITE_URL=https://staging-docs.yourcompany.com
PUBLIC_ENVIRONMENT=staging
```

Build for staging:

```bash
astro build --mode staging
```

### Production Environment

Create `.env.production`:

```cmd
PUBLIC_SITE_URL=https://docs.yourcompany.com
PUBLIC_ENVIRONMENT=production
```

Build for production:

```bash
astro build --mode production
```

## Performance Optimization

### Compression

Ensure your hosting enables gzip/brotli compression:

```nginx
# nginx
gzip on;
gzip_types text/plain text/css text/xml text/javascript 
            application/x-javascript application/xml+rss;
```

### Caching Headers

Set proper cache headers for assets:

```nginx
# Cache static assets for 1 year
location ~* \.(js|css|png|jpg|svg)$ {
  expires 1y;
  add_header Cache-Control "public, immutable";
}

# Don't cache HTML files
location ~* \.html?$ {
  expires -1;
  add_header Cache-Control "public, must-revalidate";
}
```

### CDN

Use a CDN for better performance:

- **Vercel**: Automatic
- **Netlify**: Automatic
- **AWS CloudFront**: Manual setup
- **Cloudflare**: Simple DNS redirect

## SSL/HTTPS

### Using Let's Encrypt (Free)

```bash
# With Certbot
sudo certbot certonly --webroot -w /var/www/docs \
  -d docs.yourcompany.com
```

### Using Cloudflare (Free)

1. Add your domain to Cloudflare
2. Enable "Flexible SSL" (free tier)
3. Update nameservers to Cloudflare

## Security Headers

Add these headers via your hosting provider:

```json
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'
```

## Monitoring & Analytics

### Add Monitoring

```bash
# Using Sentry for error tracking
npm install @sentry/astro
```

### Monitor Performance

- **Google Analytics**: Track user behavior
- **Vercel Analytics**: Built-in performance metrics
- **Lighthouse**: Regular performance audits

## Troubleshooting Deployment

### Build Fails on Host

**Check Node version:**

```bash
node --version  # Must be 22.12.0+
```

**Clear cache:**

```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Search Not Working After Deploy

Ensure post-build hook runs:

```bash
npm run build  # Includes Pagefind indexing
```

### Assets Return 404

Check your `astro.config.mjs` site URL:

```javascript
export default defineConfig({
  site: 'https://docs.yourcompany.com',
});
```

### Slow Initial Load

- Enable compression (gzip/brotli)
- Use a CDN
- Optimize images
- Enable caching headers

## Monitoring & Uptime

### Uptime Monitoring

Services like UptimeRobot send alerts if site goes down:

1. Create UptimeRobot account at <https://uptimerobot.com>
2. Add your documentation URL
3. Set alert email

### Performance Monitoring

Use Lighthouse CI:

```yaml
name: Lighthouse CI

on: [push, pull_request]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci && npm run build
      - uses: treosh/lighthouse-ci-action@v10
```

## Rollback Plan

### Vercel/Netlify

Simply revert to previous commit and redeploy - automatic.

### Docker

```bash
# Keep previous image versions
docker tag docs-site:old-version

# Rollback
docker run -p 8080:8080 docs-site:old-version
```

### S3/Static Files

```bash
# Keep previous builds
aws s3 sync s3://docs.yourcompany.com/ s3://docs.backups/v1/

# Restore from backup
aws s3 sync s3://docs.backups/v1/ s3://docs.yourcompany.com/
```

## Next Steps

- [Learn about security](/docs/security)
- [View troubleshooting guide](/docs/troubleshooting)
- [Advanced customization](/docs/customization)
