# Deploying to Render

Follow these steps to deploy the backend (Node) and frontend (Static site) to Render.

The repository also includes a single [`render.yaml`](render.yaml) that defines both services and their environment variable templates.

## Render Environment Templates

Backend service variables:

```bash
NODE_ENV=production
PORT=10000
CLIENT_URL=https://your-frontend.onrender.com
CLIENT_URLS=https://your-frontend.onrender.com
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/powerpulsepro?retryWrites=true&w=majority
JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRES_IN=7d
DEFAULT_ADMIN_EMAIL=admin@example.com
DEFAULT_ADMIN_PASSWORD=change_me_before_prod
SEED_EVENTS=false
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_app_password
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_PRIVATE_KEY=your_firebase_private_key
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
```

Frontend service variables:

```bash
VITE_API_URL=https://your-backend.onrender.com/api
```

1) Backend (Web Service)

- Create a new **Web Service** on Render.
- Connect your GitHub repo `powerpulseprosmartmetering/powerpulsepro`.
- Set the Root Directory to `server`.
- Build Command: `npm install`
- Start Command: `npm start`
- Health Check Path: `/api/health`
- Environment variables to add in Render dashboard: use the backend template above.

2) Frontend (Static Site)

- Create a new **Static Site** on Render.
- Connect the same GitHub repo.
- Root Directory: `client`
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`
- Environment variables: use the frontend template above.

3) After both services are deployed:

- Set `CLIENT_URL` in the backend service to the frontend URL.
- Ensure CORS allowed origins include your frontend domain.
- Trigger a redeploy of both services.

Notes:
- If you change `VITE_API_URL` to include `/api` then the client will not append `/api` again.
- Rotate any leaked credentials and do not store secrets in the repo. Use Render's environment variable UI.
