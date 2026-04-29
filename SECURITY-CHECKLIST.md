# Security Checklist for Production Deployment

Use this checklist to ensure your documentation site is secure before going live.

## Pre-Deployment Security Audit

### Code Security

- [ ] **Dependency Audit**

  ```bash
  npm audit
  npm audit fix
  ```

  - [ ] All critical vulnerabilities resolved
  - [ ] Production dependencies free of known CVEs

- [ ] **Type Safety**

  ```bash
  npm run check
  ```

  - [ ] Zero TypeScript errors
  - [ ] Zero warnings

- [ ] **Code Review**
  - [ ] All changes reviewed by team member
  - [ ] No secrets or API keys in code
  - [ ] No console.log statements in production code

### Build Verification

- [ ] **Local Build**

  ```bash
  npm run build
  ```

  - [ ] Build succeeds without errors
  - [ ] All pages generated in `dist/`
  - [ ] Search index created (`pagefind.json`)

- [ ] **Build Artifacts**
  - [ ] No development files in dist/
  - [ ] `.env` and `.env.local` not included
  - [ ] Git folder not included

### Security Headers

- [ ] **Headers Configured**
  - [ ] CSP (Content-Security-Policy) set
  - [ ] HSTS (HTTP Strict Transport Security) enabled
  - [ ] X-Content-Type-Options: nosniff
  - [ ] X-Frame-Options: DENY
  - [ ] X-XSS-Protection: 1; mode=block

**For Vercel/Netlify**:

- [ ] `vercel.json` or `netlify.toml` configured

**For Self-Hosted**:

- [ ] Nginx config (`nginx.conf`) deployed
- [ ] Headers validated via:

  ```bash
  curl -I https://docs.example.com
  ```

### HTTPS/TLS Configuration

- [ ] **SSL Certificate**
  - [ ] Valid certificate obtained (Let's Encrypt, AWS, etc.)
  - [ ] Certificate not self-signed
  - [ ] Certificate domain matches site domain
  - [ ] Certificate not expired

- [ ] **TLS Configuration**
  - [ ] TLS 1.2 or higher required
  - [ ] Strong cipher suites configured
  - [ ] HTTP redirects to HTTPS
  - [ ] HSTS preload header considered

**Test**:

```bash
curl -I https://docs.example.com  # Should show 200 OK
openssl s_client -connect docs.example.com:443  # Verify cert
```

### Environment Configuration

- [ ] **Secrets Management**
  - [ ] No secrets in repository
  - [ ] No API keys exposed
  - [ ] `.env` added to `.gitignore`
  - [ ] All secrets set in platform (GitHub Secrets, Vercel, etc.)

- [ ] **Environment Variables**
  - [ ] `NODE_ENV=production`
  - [ ] `SITE_URL` correctly set
  - [ ] All required vars configured

### Container Security (If Using Docker)

- [ ] **Base Images**
  - [ ] Using Chainguard or other hardened images
  - [ ] No debian/ubuntu base in production
  - [ ] Image scanned for CVEs

- [ ] **Build Process**

  ```bash
  docker build -t docs-site:latest .
  ```

  - [ ] Build succeeds
  - [ ] Image size reasonable (~150-200MB)

- [ ] **Security Scanning**

  ```bash
  trivy image docs-site:latest
  ```

  - [ ] Zero critical vulnerabilities
  - [ ] Accept or fix high vulnerabilities

- [ ] **Dockerfile Security**
  - [ ] Non-root user running (or Chainguard default)
  - [ ] No secrets in Dockerfile
  - [ ] Health check configured
  - [ ] Read-only filesystem where possible

### Database & Persistence (If Applicable)

- [ ] **No Direct Database Exposure**
  - [ ] Static site generation only
  - [ ] No connection strings in code
  - [ ] If using API, credentials in environment

### Access Control

- [ ] **Deployment Access**
  - [ ] Only authorized team members can deploy
  - [ ] Require code review for main branch
  - [ ] Branch protection rules enabled on GitHub/GitLab

- [ ] **SSH Keys**
  - [ ] SSH keys for deployment strong (4096-bit RSA or ED25519)
  - [ ] Keys stored securely
  - [ ] No keys in repository

- [ ] **API Credentials**
  - [ ] Generated with minimal permissions
  - [ ] Rotated regularly (every 90 days)
  - [ ] Old credentials revoked

### Monitoring & Logging

- [ ] **Access Logs**
  - [ ] Logging enabled
  - [ ] Logs stored securely
  - [ ] Log retention policy set (e.g., 30 days)

- [ ] **Error Tracking**
  - [ ] Error monitoring configured (Sentry, DataDog, etc.)
  - [ ] Alert recipients configured
  - [ ] High-error threshold alert set

- [ ] **Uptime Monitoring**
  - [ ] Uptime monitor configured (UptimeRobot, Pingdom)
  - [ ] Alerts sent when site down

- [ ] **Performance Monitoring**
  - [ ] Performance metrics configured
  - [ ] Core Web Vitals tracked
  - [ ] Alert for performance degradation

### Backups & Disaster Recovery

- [ ] **Backup Strategy**
  - [ ] Automated backups configured
  - [ ] Backups stored off-site
  - [ ] Backup retention policy set

- [ ] **Backup Testing**
  - [ ] Tested backup restoration
  - [ ] Recovery time objective (RTO) documented
  - [ ] Recovery point objective (RPO) documented

### Deployment Infrastructure

- [ ] **Hosting Provider**
  - [ ] Reputable provider chosen (Vercel, Netlify, AWS, etc.)
  - [ ] Provider has security certifications (SOC 2, ISO 27001)
  - [ ] SLA reviewed and acceptable

- [ ] **CDN Configuration** (If Using)
  - [ ] CDN enabled for static assets
  - [ ] Cache headers set correctly
  - [ ] Purge cache before release

- [ ] **Firewall Rules**
  - [ ] Only necessary ports open (80, 443)
  - [ ] Incoming traffic filtered
  - [ ] Rate limiting configured

### Domain & DNS

- [ ] **Domain Registration**
  - [ ] Domain registered with reputable registrar
  - [ ] WHOIS privacy enabled (if desired)
  - [ ] Domain locked to prevent hijacking

- [ ] **DNS Security**
  - [ ] DNS records point to correct IP
  - [ ] MX records configured (if using email)
  - [ ] SPF/DKIM records set (if using email)
  - [ ] DNSSEC considered

- [ ] **SSL/TLS Certificate**
  - [ ] Certificate auto-renewal configured
  - [ ] Renewal alerts set up
  - [ ] Certificate not self-signed

### Security Testing

- [ ] **Vulnerability Scanning**

  ```bash
  npm audit
  npm audit fix
  ```

- [ ] **OWASP Top 10 Review**
  - [ ] A01: Broken Access Control - ✓ N/A (static)
  - [ ] A02: Cryptographic Failures - ✓ HTTPS enabled
  - [ ] A03: Injection - ✓ Input validated
  - [ ] A04: Insecure Design - ✓ Static generation
  - [ ] A05: Security Misconfiguration - ✓ Hardened configs
  - [ ] A06: Vulnerable Components - ✓ Audited
  - [ ] A07: Authentication Failures - ✓ N/A (static)
  - [ ] A08: Data Integrity Failures - ✓ Git versioned
  - [ ] A09: Logging & Monitoring Gaps - ✓ Configured
  - [ ] A10: SSRF - ✓ N/A (static)

- [ ] **SSL/TLS Testing**
  - [ ] Grade A+ on SSL Labs
  - [ ] No weak ciphers
  - [ ] HSTS preload considered

**Test online**:

- <https://www.ssllabs.com/ssltest/>
- <https://securityheaders.com/>
- <https://observatory.mozilla.org/>

### Documentation

- [ ] **Deployment Guide**
  - [ ] Documented for team
  - [ ] Rollback procedure documented
  - [ ] Incident response plan created

- [ ] **Security Policy**
  - [ ] `SECURITY.md` file created
  - [ ] Vulnerability reporting process documented
  - [ ] Contact information provided

- [ ] **Operations Documentation**
  - [ ] Runbooks created for common tasks
  - [ ] Troubleshooting guide prepared
  - [ ] On-call rotation established

### Team Training

- [ ] **Security Awareness**
  - [ ] Team trained on security practices
  - [ ] OWASP awareness completed
  - [ ] Social engineering awareness completed

- [ ] **Incident Response**
  - [ ] Incident response plan reviewed
  - [ ] Team roles assigned
  - [ ] Communication channels established

## Pre-Launch Sign-Off

- [ ] **Product Owner**: _________________ Date: _______
- [ ] **Security Lead**: _________________ Date: _______
- [ ] **DevOps/Ops**: _________________ Date: _______

## Launch

- [ ] **Final Checks**
  - [ ] All checklist items completed
  - [ ] All approvals obtained
  - [ ] Team on standby during launch

- [ ] **Post-Launch**
  - [ ] Monitor for errors (first 24 hours)
  - [ ] Check security headers with curl
  - [ ] Verify backups working
  - [ ] Update status page

## Post-Launch (Ongoing)

### Monthly

- [ ] Run security audit: `npm audit`
- [ ] Review access logs
- [ ] Check certificate expiration
- [ ] Review monitoring alerts

### Quarterly

- [ ] Security assessment
- [ ] Dependency updates
- [ ] Penetration testing (considered)
- [ ] Team training refresher

### Annually

- [ ] Full security audit
- [ ] Third-party penetration test
- [ ] Disaster recovery drill
- [ ] Security policy review

---

**Checklist Version**: 1.0  
**Last Updated**: 2026-04-28  
**Next Review**: 2026-07-28

For questions, contact: <nishilvisawadia@duck.com>
