# Expense Tracker Homework

Project scaffold for CI/CD homework with a Next.js + TypeScript frontend.

## Implemented Frontend Features

- Add expense (`title`, `amount`, `category`, `date`)
- List expenses
- Delete expense
- Summary with total spending
- Total by category with simple bar visualization
- Filter by category
- Search by title
- Responsive layout for phone/desktop
- Empty state when there are no expenses

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

## Deployment Order (Vercel + GitHub Actions)

1. Push this code to GitHub `main`.
2. In Vercel, import the same repository.
3. Set root directory to `frontend/expense-tracker`.
4. Add the three Vercel secrets in GitHub Actions.
5. Push a new commit to `main` and check Actions is green.
6. Open the Vercel public URL and verify the app.
