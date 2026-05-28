# Modern Portfolio Website

A modern, responsive personal portfolio website for a third-year Computer Science Engineering (CSE) student. Built with React, TypeScript, Vite, Tailwind CSS, and Framer Motion animations.

## 🎨 Features

- **Dark Modern Theme**: Professional #0C0C0C background with glassmorphism design
- **Responsive Design**: Perfect on mobile, tablet, and desktop
- **Smooth Animations**: Framer Motion for engaging entrance and hover effects
- **Gradient Accents**: Purple → Magenta → Orange gradient buttons
- **Reusable Components**: All components are modular and data-driven
- **Type-Safe**: Full TypeScript support
- **Performance**: Optimized with Vite for fast builds
- **SEO Ready**: Semantic HTML structure

## 🛠️ Tech Stack

- **React 18.2** - UI library
- **TypeScript 5.0** - Type safety
- **Vite 4.4** - Build tool
- **Tailwind CSS 3.3** - Styling
- **Framer Motion 10.16** - Animations
- **Lucide React 0.263** - Icons

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.tsx              # Navigation bar with mobile menu
│   ├── HeroSection.tsx         # Landing section with CTA
│   ├── AboutSection.tsx        # About me section
│   ├── SkillsSection.tsx       # Skills and expertise grid
│   ├── ProjectsSection.tsx     # Featured projects showcase
│   ├── ProjectCard.tsx         # Individual project card
│   ├── ContactSection.tsx      # Contact information
│   └── Footer.tsx              # Footer with links
│
├── data/
│   └── portfolio.json          # Portfolio content (customizable)
│
├── hooks/
│   └── usePortfolio.ts         # Custom hook for portfolio data
│
├── types/
│   └── portfolio.ts            # TypeScript interfaces
│
├── App.tsx                     # Main app component
├── main.tsx                    # Entry point
└── index.css                   # Global styles
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16.0 or higher
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd project
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The portfolio will be available at `http://localhost:5173`

## 📝 Customization

All portfolio content is stored in `src/data/portfolio.json`. Edit this file to customize:

- **Profile**: Name, role, bio, location, social links
- **Skills**: Languages, frontend, backend, tools
- **Projects**: Add/remove projects with images, descriptions, and links

### Example: Adding a Project

```json
{
  "id": "4",
  "title": "Your Project Title",
  "description": "Project description",
  "image": "https://image-url.com/image.jpg",
  "technologies": ["React", "Node.js"],
  "github": "https://github.com/yourprofile/project",
  "live": "https://project-demo.com",
  "featured": false
}
```

## 🔨 Build Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## 🎯 Component Overview

### Navbar
- Sticky navigation with smooth scrolling
- Mobile-responsive menu with hamburger icon
- Logo with gradient text

### Hero Section
- Full-screen landing with animated avatar
- Large gradient heading and tagline
- CTA buttons (View Work, Get In Touch)
- Social media links (GitHub, LinkedIn, Email)
- Floating scroll indicator

### About Section
- Profile introduction
- Clean, readable typography
- Glassmorphic card design

### Skills Section
- Organized by categories
- Gradient accent bullets
- Hover animations

### Projects Section
- Featured project highlighted first
- Project cards with images
- Technology tags
- GitHub and Live links
- Hover effects with scaling

### Contact Section
- Contact methods (Email, GitHub, LinkedIn)
- Call-to-action card
- Easy-to-use contact options

### Footer
- Brand information
- Quick links
- Social media
- Copyright

## 🎨 Design System

### Colors
- **Background**: `#0C0C0C` (Dark)
- **Primary Gradient**: Purple (#9333ea) → Magenta (#ec4899) → Orange (#f97316)
- **Text**: White with varying opacity for hierarchy

### Spacing & Typography
- Base font family: System UI
- Responsive font sizes for mobile and desktop
- Consistent padding and margins

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🚀 Deployment

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload the `dist` folder to Netlify
```

### GitHub Pages
1. Update `vite.config.ts` with your repository name
2. Run `npm run build`
3. Deploy the `dist` folder

## 📄 License

This project is open source and available under the MIT License.

## 💡 Tips for Job Applications

- Keep all social links updated and professional
- Use high-quality project images (screenshots or demos)
- Write clear, concise project descriptions
- Highlight technologies and your role in each project
- Ensure no broken links
- Test on mobile before sharing

## 🤝 Contributing

Feel free to fork this portfolio and customize it for your needs!

---

**Happy coding! 🎉**
