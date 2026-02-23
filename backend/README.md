# Backend (Spring Boot + PostgreSQL)

This backend exposes an expense API used by the frontend.

## Tech Stack

- Java 21
- Spring Boot
- Spring Data JPA
- PostgreSQL
- Jib (container image build for GHCR)

## Endpoints

- `GET /api/expenses`
- `POST /api/expenses`
- `DELETE /api/expenses/{id}`

## Local Run

Set environment variables first:

- `SPRING_DATASOURCE_URL`
- `SPRING_DATASOURCE_USERNAME`
- `SPRING_DATASOURCE_PASSWORD`
- `FRONTEND_ORIGIN` (optional, defaults to `http://localhost:3000`)

Then run:

```bash
mvn -f backend/pom.xml spring-boot:run
```

## CI/CD

Workflow: `.github/workflows/backend-ghcr.yml`

- Builds and tests backend
- Pushes image to `ghcr.io/<owner>/expense-backend` with `latest` and commit SHA tags

Bonus CD workflow: `.github/workflows/backend-cd-render.yml`

- Triggers Render deploy hook after successful image push workflow
- Requires GitHub secret `RENDER_DEPLOY_HOOK_URL`
