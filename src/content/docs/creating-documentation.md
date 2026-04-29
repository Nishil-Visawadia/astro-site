---
title: "Creating Documentation"
description: "Learn how to create and organize documentation pages"
icon: "book"
order: 2.5
---

This guide shows you how to create, organize, and structure documentation pages using this framework.

## Understanding the Content Structure

All documentation pages live in `src/content/docs/` as Markdown files. The framework automatically:
- Generates routes for each file
- Creates navigation menus
- Indexes content for search
- Generates table of contents

## Creating Your First Page

### 1. Create a New Markdown File

Create a new file in `src/content/docs/`:

```bash
src/content/docs/
├── index.md                    # Introduction
├── getting-started.md          # Getting started guide
├── installation.md             # Installation guide
├── your-new-page.md            # Your new page ← Create here
└── advanced-usage.md           # Advanced features
```

### 2. Add Front Matter

Every Markdown file must start with front matter (YAML block between `---` markers):

```markdown
---
title: "Your Page Title"
description: "Brief description for search and metadata"
icon: "book"
order: 3
---

# Your Page Title

Content goes here...
```

### 3. Front Matter Fields Explained

| Field         | Type   | Required | Description                                 |
| ------------- | ------ | -------- | ------------------------------------------- |
| `title`       | string | Yes      | Page title (shown in nav and header)        |
| `description` | string | Yes      | Brief description for SEO and search        |
| `icon`        | string | No       | Icon name (`book`, `rocket`, `sparkles`)    |
| `order`       | number | Yes      | Sort order in navigation (lower = higher)   |
| `slug`        | string | No       | Custom URL path (auto-generated if omitted) |

### 4. Example Page

```markdown
---
title: "API Reference"
description: "Complete API documentation"
icon: "book"
order: 5
---

# API Reference

## Authentication

Our API uses token-based authentication.

### Getting Your Token

1. Log in to your account
2. Navigate to Settings > API
3. Click "Generate Token"

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  https://api.example.com/v1/docs
```

## Endpoints

### Get All Documents

```
GET /v1/docs
```

**Response:**
```json
{
  "data": [
    {
      "id": "doc-1",
      "title": "Getting Started",
      "content": "..."
    }
  ]
}
```
```

## Organizing Your Documentation

### Directory Structure (Optional)

You can organize pages in subdirectories:

```bash
src/content/docs/
├── index.md
├── getting-started.md
├── guides/
│   ├── authentication.md
│   ├── api-usage.md
│   └── deployment.md
└── tutorials/
    ├── basic-setup.md
    └── advanced-features.md
```

Routes are automatically generated:
- `src/content/docs/guides/authentication.md` → `/docs/guides/authentication`
- `src/content/docs/tutorials/basic-setup.md` → `/docs/tutorials/basic-setup`

### Setting Navigation Order

Use the `order` field to control sidebar position:

```yaml
---
title: "Getting Started"
order: 1          # Appears first
---
```

```yaml
---
title: "Advanced Usage"
order: 3          # Appears third
---
```

**Note**: Use decimal values for finer control:
```yaml
order: 1.5  # Between order 1 and 2
order: 2.7  # Between order 2 and 3
```

## Writing Content

### Supported Markdown Syntax

#### Headings

```markdown
# H1 - Page Title
## H2 - Main Section
### H3 - Subsection
#### H4 - Sub-subsection
```

#### Text Formatting

```markdown
**Bold text** or __bold__
*Italic text* or _italic_
~~Strikethrough~~
`Inline code`
```

#### Lists

Unordered lists:
```markdown
- Item 1
- Item 2
  - Nested item
  - Nested item
```

Ordered lists:
```markdown
1. First step
2. Second step
3. Third step
```

#### Code Blocks

JavaScript:
```markdown
\`\`\`javascript
function hello() {
  console.log('Hello, World!');
}
\`\`\`
```

Bash:
```markdown
\`\`\`bash
npm install
npm run dev
\`\`\`
```

#### Links

```markdown
[Link text](https://example.com)
[Relative link](/docs/getting-started)
```

#### Blockquotes

```markdown
> This is a blockquote
> 
> It can span multiple lines
```

#### Tables

```markdown
| Feature | Description       | Status |
| ------- | ----------------- | ------ |
| Search  | Full-text search  | ✓      |
| Mobile  | Responsive design | ✓      |
| Export  | PDF export        | ✗      |
```

## Using Icons

Available icons for the `icon` field:

| Icon       | Usage                         |
| ---------- | ----------------------------- |
| `book`     | General documentation, guides |
| `rocket`   | Getting started, quick start  |
| `sparkles` | Advanced features, premium    |

Add to your front matter:
```yaml
---
title: "My Page"
icon: "rocket"
---
```

## Best Practices

### 1. Clear Headings

Use hierarchical headings:

```markdown
# Main Title
## Section
### Subsection
#### Detail

# Next Main Topic
```

### 2. Code Examples

Show practical examples:

```markdown
## Installation

```bash
npm install your-package
```

## Usage

```javascript
import { yourFunction } from 'your-package';
yourFunction();
```
```

### 3. Progressive Disclosure

Start simple, build complexity:

```markdown
## Basic Usage

For most users, this is all you need...

## Advanced Configuration

If you need more control, you can configure...

## Troubleshooting

If something isn't working...
```

### 4. Consistent Formatting

- Use consistent spacing
- Maintain visual hierarchy
- Use lists for multiple items
- Use tables for comparisons

### 5. Cross-references

Link to other documentation:

```markdown
For more details, see the [API Reference](/docs/api-reference).

Learn more in the [Getting Started](/docs/getting-started) guide.
```

## Preview Your Changes

1. Make sure dev server is running:
   ```bash
   npm run dev
   ```

2. Edit your markdown file

3. The browser automatically refreshes with your changes

4. Your page appears in the navigation menu (sorted by `order`)

## Build and Deploy

When ready to publish:

```bash
npm run build
```

This will:
- Generate static HTML pages
- Create search index (Pagefind)
- Output to `dist/` folder
- Ready for deployment

See [Deployment Guide](/docs/deployment) for hosting options.

## Common Patterns

### Tutorial Page

```markdown
---
title: "Build Your First App"
description: "Step-by-step tutorial"
order: 3
---

# Build Your First App

In this tutorial, you'll learn how to create...

## Prerequisites

- Node.js 22+
- npm

## Step 1: Project Setup

```bash
npm create astro@latest my-app
cd my-app
```

## Step 2: Installation

```bash
npm install
```

## Step 3: Run

```bash
npm run dev
```

## Next Steps

Now that you have... continue with [Advanced Usage](/docs/advanced-usage).
```

### Reference Page

```markdown
---
title: "API Reference"
description: "Complete API documentation"
order: 5
---

# API Reference

## GET /docs/{id}

Retrieve a specific document.

### Parameters

| Name | Type   | Required |
| ---- | ------ | -------- |
| id   | string | Yes      |

### Response

```json
{
  "id": "doc-123",
  "title": "Example",
  "content": "..."
}
```

### Example

```bash
curl https://api.example.com/docs/doc-123
```
```

## Need Help?

- Check existing pages for examples
- See [Troubleshooting](/docs/troubleshooting)
- Open an issue on GitHub
