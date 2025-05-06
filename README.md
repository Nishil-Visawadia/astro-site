# Astro Documentation Site

## Project Overview

A modern, fast, and feature-rich documentation site built with Astro v5.7.10. This project demonstrates the power of Astro's content collections and documentation capabilities, combining React components with Tailwind CSS for a polished user experience.

[![Made with Astro](https://astro.badg.es/v2/built-with-astro/small.svg)](https://astro.build)

### Key Features

- 📚 Organized documentation system using Astro's content collections
- ⚡ Fast performance with Astro's partial hydration
- 🎨 Beautiful responsive design using Tailwind CSS and DaisyUI
- 📝 Markdown support with syntax highlighting
- 🚀 Modern development experience

## Technical Stack

- **Framework**: [Astro](https://astro.build) v5.7.10
- **UI Components**: [React](https://reactjs.org) v19.1.0
- **Styling**:
  - [Tailwind CSS](https://tailwindcss.com) v3.4.17
  - [DaisyUI](https://daisyui.com) v5.0.35
  - [@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin)
  - Fluid typography support
- **Content**:
  - Markdown with [@astrojs/markdown-remark](https://docs.astro.build/en/guides/markdown-content/)
  - Syntax highlighting with Prism themes
  - GitHub Markdown CSS

## Project Structure

```text
src/
├── content/
│   └── docs/         # Documentation markdown files
│       ├── index.md
│       ├── getting-started.md
│       └── advanced-usage.md
├── layouts/
│   └── DocsLayout.astro   # Documentation page layout
└── pages/
    ├── index.astro        # Home page
    └── docs/
        └── [...slug].astro  # Dynamic doc pages routing
```

## Setup and Installation

### Prerequisites

- Node.js (latest LTS version recommended)
- npm or yarn package manager

### Getting Started

1. Clone the repository:

    ```bash
        git clone <repository-url>
        cd astro-site
    ```

2. Install dependencies:

    ```bash
        npm install
    ```

3. Available scripts:

    ```bash
        npm run dev      # Start development server
        npm run build    # Build for production
        npm run preview  # Preview production build
    ```

## Documentation Structure

The documentation is organized into several key sections:

1. **Introduction** (`/docs/index.md`)
   - Project overview
   - Key features
   - Basic concepts

2. **Getting Started** (`/docs/getting-started.md`)
   - Installation guide
   - Initial setup
   - Basic usage

3. **Advanced Usage** (`/docs/advanced-usage.md`)
   - Detailed features
   - Best practices
   - Advanced configurations

## Features

### Fast Performance

- Built with Astro's partial hydration system
- Optimized asset loading
- Minimal client-side JavaScript

### Markdown Support

- Full Markdown support with frontmatter
- Code syntax highlighting via Prism
- Custom components in Markdown

### Responsive Design

- Mobile-first approach with Tailwind CSS
- Beautiful UI components from DaisyUI
- Fluid typography for better readability

### Content Management

- Organized using Astro's content collections
- Type-safe content with TypeScript support
- Easy-to-maintain documentation structure

## Development Guidelines

### Adding New Documentation Pages

1. Create a new Markdown file in `src/content/docs/`
2. Add frontmatter with required metadata:

```markdown
---
title: "Your Title"
description: "Page description"
icon: "optional-icon"
order: 1
---
```

### Modifying the Documentation Layout

The main documentation layout is in `src/layouts/DocsLayout.astro`. Customize it to:

- Adjust the navigation structure
- Modify the sidebar
- Change the header/footer
- Add new components

### Customizing Styles

1. Tailwind CSS customization in `tailwind.config.cjs`
2. DaisyUI theme configuration
3. Typography modifications through `@tailwindcss/typography`

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Submit a Pull Request with your changes

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Built with ❤️ using [Astro](https://astro.build)
