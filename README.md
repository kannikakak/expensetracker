# Expense Tracker Homework

Project scaffold for CI/CD homework with a Next.js + TypeScript frontend.

## Structure

```text
HOMEWORK/
  .github/
    workflows/
      frontend-vercel.yml
      backend-ghcr.yml   (later)
  frontend/
    expense-tracker/
      app/
      components/
      data/
      types/
      package.json
      next.config.mjs
      tsconfig.json
  backend/
    README.md
  README.md
```

## Frontend (Next.js + TypeScript)

```bash
cd frontend/expense-tracker
npm install
npm run dev
```

Open `http://localhost:3000`.

## Frontend CI/CD

Workflow file: `.github/workflows/frontend-vercel.yml`

Triggers:
- Push to `main` (when frontend files change)
- Manual run (`workflow_dispatch`)

Required GitHub secrets:
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`
