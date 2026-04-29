import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context: any, next: any) => {
    const response = await next();

    // Security Headers
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');

    // HSTS (HTTP Strict Transport Security) - enforces HTTPS
    // Set to 1 year (31536000 seconds) in production
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');

    // Content Security Policy - prevents XSS attacks
    response.headers.set(
        'Content-Security-Policy',
        "default-src 'self'; " +
        "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://pagefind.app; " +
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
        "font-src 'self' https://fonts.gstatic.com data:; " +
        "img-src 'self' data: https:; " +
        "connect-src 'self' https:; " +
        "frame-ancestors 'none'; " +
        "base-uri 'self'; " +
        "form-action 'self';"
    );

    // Sanitize search queries to prevent injection
    const url = new URL(context.request.url);
    if (url.searchParams.has('q')) {
        const query = url.searchParams.get('q') || '';

        // Remove HTML tags and trim
        const sanitized = query
            .replace(/<[^>]*>/g, '')
            .trim()
            .slice(0, 500); // Limit length

        if (sanitized.length === 0) {
            url.searchParams.delete('q');
        } else if (sanitized !== query) {
            url.searchParams.set('q', sanitized);
        }
    }

    return response;
});
