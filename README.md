# Kaluwala Web

A modern web application built with Next.js 15, Sanity CMS, Tailwind CSS v4, and shadcn/ui.

## 🚀 Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS v4** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible UI components
- **Sanity CMS** - Headless content management system

## 📦 Installation

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone <your-repo-url>
   cd kaluwala-web
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Copy `.env.local` and fill in your Sanity project details:
   ```bash
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
   SANITY_API_TOKEN=your_api_token_here
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser** and navigate to `http://localhost:3000`

## 🎨 UI Components

This project uses shadcn/ui for components. To add new components:

```bash
npx shadcn@latest add <component-name>
```

Available components: https://ui.shadcn.com/docs/components

## 📝 Sanity CMS Setup

1. **Create a Sanity project**:
   - Go to https://sanity.io
   - Create a new project
   - Note down your project ID

2. **Update environment variables**:
   - Add your project ID to `.env.local`
   - Set your dataset name (usually "production")

3. **Create schemas** (when ready):
   - Set up Sanity Studio
   - Define your content schemas
   - Update the types in `src/types/sanity.ts`

## 🔧 Configuration Files

- `components.json` - shadcn/ui configuration
- `tailwind.config.ts` - Tailwind CSS configuration (if needed)
- `src/lib/sanity.ts` - Sanity client configuration
- `src/types/sanity.ts` - TypeScript types for Sanity documents

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router pages (routing only)
│   └── page.tsx        # Homepage route (imports from ui-pages)
├── ui-pages/           # Client components for pages
│   ├── index.ts        # Barrel exports for all pages
│   └── HomePage.tsx    # Homepage UI component
├── components/          # React components
│   └── ui/             # shadcn/ui components
├── lib/                # Utility functions and configurations
│   ├── sanity.ts       # Sanity client setup
│   └── utils.ts        # General utilities
└── types/              # TypeScript type definitions
    └── sanity.ts       # Sanity-specific types
```

### Architecture Pattern

This project follows a clean separation between routing and UI:

- **`src/app/`** - Contains only Next.js App Router files for routing. These files should be minimal and only import/render components from `ui-pages/`.
- **`src/ui-pages/`** - Contains all page-level UI components that require client-side functionality (React hooks, state, etc.). These are marked with `'use client'`.
- **`src/components/`** - Reusable UI components, including shadcn/ui components.

This pattern keeps the app directory clean and makes it easy to identify which components are client-side.

## 🚀 Deployment

This project can be deployed on Vercel, Netlify, or any platform that supports Next.js.

For Vercel:
```bash
npm run build
```

Make sure to add your environment variables to your deployment platform.

## 📚 Next Steps

1. Set up your Sanity project and configure environment variables
2. Create content schemas in Sanity Studio
3. Add more shadcn/ui components as needed
4. Build your application pages and components
5. Set up proper error handling and loading states
6. Add authentication if needed
7. Optimize for production

## 🛠 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📖 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Sanity Documentation](https://www.sanity.io/docs)
