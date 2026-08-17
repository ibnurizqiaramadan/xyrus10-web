# Personal Portfolio - Ibnu Rizqia Ramadan

A modern, dark-themed personal portfolio website built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui. Features a futuristic VPS dashboard aesthetic with smooth animations and glassmorphism effects.

## 🎨 Design Features

- **Dark Futuristic Theme**: Inspired by modern VPS dashboards
- **Glassmorphism Effects**: Semi-transparent cards with blur effects
- **Smooth Animations**: Powered by Framer Motion
- **Responsive Design**: Mobile-first approach, works on all devices
- **Interactive Elements**: Hover effects, glowing borders, and transitions

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Components**: shadcn/ui
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Theme**: next-themes
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd xyrus10-next
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
src/
├── app/
│   ├── about/page.tsx          # About page
│   ├── projects/page.tsx       # Projects showcase
│   ├── contact/page.tsx        # Contact form
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   └── globals.css             # Global styles
├── components/
│   ├── ui/                     # shadcn/ui components
│   ├── BackgroundEffects.tsx  # Animated background orbs
│   ├── ContactForm.tsx         # Contact form with validation
│   ├── Container.tsx           # Max-width container
│   ├── GradientDivider.tsx    # Animated gradient divider
│   ├── Hero.tsx                # Hero section
│   ├── Navbar.tsx              # Navigation bar
│   ├── ProjectCard.tsx         # Project card component
│   ├── SectionTitle.tsx        # Section title component
│   └── ThemeProvider.tsx       # Theme provider wrapper
└── lib/
    └── utils.ts                # Utility functions
```

## 🎨 Customization

### Colors

The color scheme is defined in `src/app/globals.css`:
- **Background**: `#0D0F1A`
- **Primary**: `#4F46E5` (Indigo)
- **Secondary**: `#22D3EE` (Cyan)
- **Text Primary**: `#F8FAFC`
- **Text Secondary**: `#94A3B8`

### Content

1. **Personal Information**: Update in respective page components
2. **Projects**: Edit the `projects` array in `src/app/projects/page.tsx`
3. **Skills**: Modify the `skills` array in `src/app/about/page.tsx`
4. **Social Links**: Update URLs in component files

### Avatar Image

Replace the placeholder in `public/avatar.jpg` with your own image (recommended: 400x400px, square format).

## 📦 Build & Deploy

### Build for production:
```bash
npm run build
```

### Start production server:
```bash
npm start
```

### State that must survive a deploy

Two paths hold everything the CMS owns. Neither is in git, and neither is
rebuilt by `pnpm build` — copy them forward, or the site comes back empty:

- `data/` — the SQLite database (content, settings, admin users). Override the
  location with `DATABASE_PATH`; both the app and `drizzle-kit` read it.
- `public/uploads/` — files added through the media manager. Database rows
  reference these by URL, so losing them leaves broken images behind.

Set `SITE_URL` to the public origin (**with the scheme**) so `metadataBase`,
`robots.txt` and `sitemap.xml` emit absolute URLs. See `.env.example`.

#### Create the first admin user

A fresh database has **no admin user** and there is no signup page, so until you
create one `/admin/login` rejects every attempt:

```bash
pnpm create-admin <username> <password>
```

Point it at a database somewhere else with `DATABASE_PATH`:

```bash
DATABASE_PATH=/srv/xyrus10/data/sqlite.db pnpm create-admin <username> <password>
```

#### Seed the content

`pnpm db:seed` loads the portfolio content. It **deletes** the hero, about,
experience, project and contact tables first, so it is for a fresh database —
not a top-up of a database you have already edited through `/admin`.

## 📝 Features

- ✅ **Home**: Hero section with typing animation and social links
- ✅ **About**: Personal bio, skills, and values
- ✅ **Projects**: Grid showcase with tech stack badges and links
- ✅ **Contact**: Form with validation and contact information
- ✅ **Navbar**: Sticky navigation with scroll effects
- ✅ **Animations**: Smooth page transitions and scroll animations
- ✅ **SEO**: Optimized meta tags and Open Graph data
- ✅ **Performance**: Optimized images and lazy loading

## 🔧 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 💬 Contact

Feel free to reach out through the contact form on the website or connect on social media.

---

Built with ❤️ using Next.js
