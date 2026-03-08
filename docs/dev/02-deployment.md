# Deployment and CI/CD

The application is containerized using **Docker** to ensure parity between development and production environments.

## 🐳 Build with Docker (Production)

The application uses the Nitro preset configured for a Node Server environment.

1. **Build the image:**
   ```bash
   docker build -t anthony-portfolio:latest .
   ```

2. **Run the container:**
   ```bash
   docker run -d -p 3000:3000 --env-file .env anthony-portfolio:latest
   ```

## 🔄 Continuous Integration (GitHub Actions)

A typical CI/CD pipeline for this project should include the following steps upon a `push` to the `main` branch:

1. **Code Verification**: Execution of `npm run lint` or type validation with `vue-tsc`.
2. **Nuxt Studio Sync**: Ensure the Nuxt Studio application has write permissions on the repository to auto-commit editor changes.
3. **Automated Build and Deployment**:
   - Rebuild the Docker image via a GitHub Action.
   - Push the image to a secure registry (GHCR, Docker Hub).
   - Trigger a Webhook to the production server (VPS) to pull and restart the new container.
