# Muhammed Kamil Babatunde — Engineering Portfolio

React + TypeScript + Vite + Tailwind CSS, Framer Motion, Recharts, React Router.

## Run

```bash
npm install
cp .env.example .env     # then add your Web3Forms key (see below)
npm run dev              # http://localhost:5173
npm run build            # type-check + production build into dist/
npm run preview          # serve the production build locally
```

## Make the contact form deliver email

1. Go to https://web3forms.com and create a free access key using **kamzycoded@gmail.com**.
2. Put it in `.env` as `VITE_WEB3FORMS_KEY=your-key`.
3. On your host (Netlify / Vercel), add the same variable in the project's environment settings, then redeploy.

Without a key the form falls back to opening the visitor's email app with the message prefilled to you. It never pretends to have sent.

## Deploy

- **Netlify:** build command `npm run build`, publish directory `dist`. `public/_redirects` handles SPA routing.
- **Vercel:** framework Vite. `vercel.json` handles SPA routing.
- Set `VITE_SITE_URL` (e.g. `https://yourdomain.com`) so canonical tags are emitted.

## Structure

```
public/           favicon, og image, CV PDF, portrait
src/data/site.ts  all content: profile, projects, experience, skills, links
src/components/   Layout, ui primitives, diagrams, widgets, ContactForm
src/pages/        Home, About, Projects, SprintAfrica, SprintConnect,
                  Experience, Engineering, Contact, NotFound
src/lib/seo.tsx   per-page title, description, canonical
```

Edit content in `src/data/site.ts`; pages render from it.
