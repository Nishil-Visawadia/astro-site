---
title: "Security Best Practices"
description: "Security guidelines, compliance, and hardening recommendations"
icon: "book"
order: 6
---

This guide covers security best practices, compliance, and hardening recommendations for your documentation site.

## Security Overview

This framework is built with security in mind:

✅ **Static Site Generation** - No server-side code execution
✅ **Hardened Container Images** - Chainguard base images, zero known CVEs
✅ **TypeScript** - Compile-time type safety
✅ **Dependency Scanning** - Regular security audits
✅ **HTTPS Support** - TLS/SSL encrypted by default
✅ **Content Security Policy** - Prevent XSS attacks
✅ **OWASP Compliance** - Follows OWASP Top 10 guidelines

## Content Security Policy (CSP)

### Add CSP Headers

CSP headers prevent XSS and injection attacks.

**In `astro.config.mjs` (using middleware):**

```javascript
export default defineConfig({
  // ... other config
  middleware: 'auth',
});
```

**Create middleware in `src/middleware.ts`:**

```typescript
import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware((context, next) => {
  // Add CSP header
  const response = next();
  
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none';"
  );
  
  return response;
});
```

**Or via hosting provider (Vercel):**

Create `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none';"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ]
}
```

### CSP Header Breakdown

| Directive         | Purpose                        | Value                            |
| ----------------- | ------------------------------ | -------------------------------- |
| `default-src`     | Default source for all content | `'self'` (only from same origin) |
| `script-src`      | Allowed script sources         | `'self'` + trusted CDNs          |
| `style-src`       | Allowed stylesheet sources     | `'self'` + inline                |
| `img-src`         | Allowed image sources          | `'self'`, data URLs, HTTPS       |
| `font-src`        | Allowed font sources           | `'self'` + data URLs             |
| `connect-src`     | Allowed API connections        | `'self'` (API calls)             |
| `frame-ancestors` | Who can embed us               | `'none'` (don't allow framing)   |

## Security Headers

### Essential Headers

Implement these security headers:

```
X-Content-Type-Options: nosniff
```
Prevents MIME type sniffing attacks.

```
X-Frame-Options: DENY
```
Prevent clickjacking by disallowing framing.

```
X-XSS-Protection: 1; mode=block
```
Enable browser XSS protection.

```
Referrer-Policy: strict-origin-when-cross-origin
```
Control referrer information.

```
Strict-Transport-Security: max-age=31536000; includeSubDomains
```
Force HTTPS (set max-age to seconds, 31536000 = 1 year).

### Nginx Configuration

Add to your Nginx config:

```nginx
# /etc/nginx/nginx.conf
server {
    # ... other config ...
    
    # Security headers
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "DENY" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header Content-Security-Policy "default-src 'self';" always;
    
    # Disable server version disclosure
    server_tokens off;
}
```

## HTTPS/TLS

### Generate SSL Certificate

**Using Let's Encrypt (Free):**

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Generate certificate
sudo certbot certonly --nginx -d docs.yourcompany.com

# Auto-renewal
sudo systemctl enable certbot.timer
```

**Using Cloudflare (Free):**

1. Add domain to Cloudflare
2. SSL/TLS → Encryption → Select "Flexible" or "Full"
3. Update nameservers

### Nginx HTTPS Setup

```nginx
server {
    listen 80;
    server_name docs.yourcompany.com;
    return 301 https://$server_name$request_uri;  # Redirect to HTTPS
}

server {
    listen 443 ssl http2;
    server_name docs.yourcompany.com;
    
    ssl_certificate /etc/letsencrypt/live/docs.yourcompany.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/docs.yourcompany.com/privkey.pem;
    
    # Strong cipher suites
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    
    # ... rest of config ...
}
```

## Dependency Security

### Regular Audits

Check for vulnerable dependencies:

```bash
# Audit all packages
npm audit

# Fix known vulnerabilities
npm audit fix

# Audit dev dependencies only
npm audit --dev
```

### Update Dependencies

```bash
# Check for outdated packages
npm outdated

# Update minor/patch versions safely
npm update

# Update major versions (requires testing)
npm install package@latest
```

### Lock File

Always commit `package-lock.json`:

```bash
git add package-lock.json
git commit -m "Update dependencies"
```

This ensures reproducible builds across environments.

## Environment Variables

### Sensitive Configuration

Never commit secrets to Git.

**Create `.env.local` (never commit this):**

```
DATABASE_URL=postgresql://user:password@host/db
API_KEY=your-secret-key
```

**Reference in code:**

```typescript
const apiKey = import.meta.env.API_KEY;
```

**In GitHub Actions (secrets):**

1. Repository → Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Add variables like `API_KEY`

**Use in workflow:**

```yaml
- name: Deploy
  env:
    API_KEY: ${{ secrets.API_KEY }}
  run: npm run deploy
```

## Input Validation

### Validate Search Input

Example middleware for search queries:

```typescript
// src/middleware.ts
export const onRequest = defineMiddleware((context, next) => {
  // Sanitize search queries
  if (context.url.searchParams.has('q')) {
    const query = context.url.searchParams.get('q') || '';
    
    // Remove suspicious patterns
    const sanitized = query
      .replace(/<script[^>]*>.*?<\/script>/gi, '')
      .replace(/<[^>]+>/g, '')
      .trim();
    
    if (sanitized.length === 0) {
      context.url.searchParams.delete('q');
    } else {
      context.url.searchParams.set('q', sanitized);
    }
  }
  
  return next();
});
```

## Rate Limiting

### Prevent Abuse

Implement rate limiting at hosting level:

**Vercel rate limiting:**

```json
{
  "functions": {
    "api/search": {
      "maxDuration": 10,
      "memory": 256
    }
  }
}
```

**Nginx rate limiting:**

```nginx
limit_req_zone $binary_remote_addr zone=search:10m rate=10r/s;

location /api/search {
    limit_req zone=search burst=20 nodelay;
    proxy_pass http://backend;
}
```

## Monitoring & Logging

### Security Logging

Enable and monitor access logs:

**Nginx logs:**

```nginx
access_log /var/log/nginx/access.log combined;
error_log /var/log/nginx/error.log;
```

**Parse for attacks:**

```bash
# Look for SQL injection attempts
grep -E "union|select|drop" /var/log/nginx/access.log

# Look for XSS attempts
grep -E "<script|javascript:" /var/log/nginx/access.log
```

### Error Monitoring

Use Sentry for production error tracking:

```bash
npm install @sentry/astro
```

Configure in `astro.config.mjs`:

```javascript
import Sentry from "@sentry/astro";

export default defineConfig({
  integrations: [
    Sentry({
      dsn: "https://your-sentry-dsn@sentry.io/123456",
      environment: "production",
      tracesSampleRate: 0.1,
    })
  ]
});
```

## OWASP Top 10 Compliance

### A01: Broken Access Control

✅ **Implementation:**
- Static site (no database)
- All content publicly visible by design
- No authentication required

### A02: Cryptographic Failures

✅ **Implementation:**
- HTTPS/TLS enforced
- Secure headers set
- No sensitive data in content

### A03: Injection

✅ **Implementation:**
- TypeScript prevents type-based injections
- Template escaping by default
- Input validation for search

### A04: Insecure Design

✅ **Implementation:**
- Static generation prevents server exploits
- Minimal attack surface
- No database connections

### A05: Security Misconfiguration

✅ **Implementation:**
- Hardened Docker images
- Security headers configured
- Dependency scanning enabled

### A06: Vulnerable Components

✅ **Implementation:**
- Regular `npm audit`
- Automated dependency updates
- GitHub security alerts

### A07: Authentication Failures

✅ **Implementation:**
- No authentication layer (not required)
- Static content only
- No user accounts

### A08: Data Integrity Failures

✅ **Implementation:**
- Content versioned in Git
- Integrity checks available
- Secure deployment pipeline

### A09: Logging & Monitoring Gaps

✅ **Implementation:**
- Server-side logging configured
- Error monitoring (Sentry)
- Performance monitoring available

### A10: SSRF

✅ **Implementation:**
- No external API calls from server
- Static generation only
- Limited outbound connections

## Security Checklist

Use this checklist before production deployment:

**Code Security:**
- [ ] No secrets in Git repo
- [ ] TypeScript strict mode enabled
- [ ] All dependencies audited
- [ ] No console.log of sensitive data

**Deployment Security:**
- [ ] HTTPS/TLS configured
- [ ] Security headers set
- [ ] CSP policy configured
- [ ] Environment variables set

**Container Security:**
- [ ] Using hardened base images
- [ ] Non-root user in Dockerfile
- [ ] No unnecessary packages installed
- [ ] Security scanning passed

**Operations Security:**
- [ ] Logging enabled
- [ ] Error monitoring configured
- [ ] Uptime monitoring active
- [ ] Backup strategy in place

**Documentation:**
- [ ] Security policy documented
- [ ] Incident response plan created
- [ ] Emergency contacts identified
- [ ] Recovery procedures tested

## Incident Response

### Security Incident Procedure

1. **Detect** - Monitor logs and alerts
2. **Contain** - Take site offline if necessary
3. **Investigate** - Analyze logs and affected content
4. **Remediate** - Fix vulnerability and rebuild
5. **Restore** - Redeploy fixed version
6. **Review** - Analyze incident and prevent recurrence

### Example Response

```bash
# Take site offline
docker stop docs-container

# Inspect logs for compromise
docker logs docs-container > incident-report.txt

# Fix vulnerability
git checkout previous-commit
npm audit fix

# Rebuild and redeploy
npm run build
docker build -t docs-site:hotfix .
docker run -d -p 8080:8080 docs-site:hotfix
```

## Security Resources

- **OWASP**: https://owasp.org/
- **NIST Cybersecurity**: https://www.nist.gov/cyberframework
- **npm Security**: https://docs.npmjs.com/about-npm-security
- **CIS Benchmarks**: https://www.cisecurity.org/benchmarks
- **Astro Security**: https://docs.astro.build/guides/security

## Getting Help

- Report security issues privately: security@yourcompany.com
- GitHub Security Advisory: https://github.com/advisories
- Community: Join discussions in GitHub Issues

---

**Remember**: Security is an ongoing process. Regularly review, update, and test your security measures.
