<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Portfolio Website Project

Modern, responsive portfolio website for CSE students.

### Tech Stack
- React 18.2 + TypeScript 5.0
- Vite 4.4 (build tool)
- Tailwind CSS 3.3 (styling)
- Framer Motion 10.16 (animations)
- Lucide React 0.263 (icons)

### Key Features
- Dark modern theme (#0C0C0C)
- Gradient accent buttons (Purple → Magenta → Orange)
- Fully responsive (mobile, tablet, desktop)
- Smooth animations and transitions
- All content managed in portfolio.json (no hardcoded text)
- Type-safe with TypeScript

### Development
- Start dev server: `npm run dev`
- Build production: `npm run build`
- Lint code: `npm run lint`

### Project Structure
```
src/
├── components/          # React components
├── data/               # portfolio.json (content)
├── hooks/              # usePortfolio hook
├── types/              # TypeScript interfaces
├── App.tsx
└── main.tsx
```

### Customization Guide
Edit `src/data/portfolio.json` to customize:
- Profile info, bio, social links
- Skills (languages, frontend, backend, tools)
- Projects (add/remove/update)

### Quality Standards
- No hardcoded text in components
- All data from JSON file
- Responsive on all devices
- Proper TypeScript types
- Clean, readable component code
- Accessible and semantic HTML
