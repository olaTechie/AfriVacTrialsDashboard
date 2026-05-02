# AfriVac Trials

A production-ready Vite React migration of the original Streamlit dashboard for vaccine clinical trials conducted across Africa. The app keeps the original evidence workflow: global filters, phase metrics, country maps, country-year heatmaps, categorical charts, trend analysis, data exploration, report-style summaries, and a searchable references table.

## Tech Stack

- React 18 and Vite
- React Router with `HashRouter` for GitHub Pages refresh-safe routes
- Recharts and Plotly for visualizations
- Framer Motion for page and card motion
- Papa Parse for client-side CSV loading
- GitHub Actions and GitHub Pages deployment

## Local Development

```bash
npm install
npm run dev
```

The development server will print a local URL, usually `http://localhost:5173`.

## Build

```bash
npm run build
npm run preview
```

The production build is emitted to `dist/`.

## Deployment

The workflow at `.github/workflows/deploy.yml` builds the Vite app and deploys `dist/` to GitHub Pages whenever `main` is pushed.

1. Push this repository to GitHub.
2. In GitHub, open **Settings > Pages**.
3. Set **Build and deployment** to **GitHub Actions**.
4. Push to `main` or run the **Deploy to GitHub Pages** workflow manually.

`vite.config.js` automatically sets the correct base path during GitHub Actions using the repository name. Routing uses hash URLs, so nested pages remain stable after refresh on GitHub Pages.

## Repository Setup Commands

```bash
git init
git add .
git commit -m "Migrate Streamlit dashboard to Vite React"
git branch -M main
git remote add origin https://github.com/<your-user>/<your-repo>.git
git push -u origin main
```

If the repository already exists locally, skip `git init` and only add the remote if needed.

## Migration Notes

The original Streamlit app included Python-only Pygwalker profiling and an experimental LangChain/Gemini RAG chat. GitHub Pages is static hosting, so those backend-dependent features were converted into frontend-safe exploratory pages and deterministic dataset summaries. The structure leaves a clean path for adding an API-backed assistant later.
