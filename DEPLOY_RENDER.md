# Deploying to Render

Follow these steps to deploy the backend (Node) and frontend (Static site) to Render.

1) Backend (Web Service)

- Create a new **Web Service** on Render.
- Connect your GitHub repo `powerpulseprosmartmetering/powerpulsepro`.
- Set the Root Directory to `server`.
- Build Command: `npm install`
- Start Command: `npm start`
- Health Check Path: `/api/health`
- Environment variables to add in Render dashboard (example names):
  - `NODE_ENV=production`
  - `MONGODB_URI` — your production MongoDB connection string
  - `JWT_SECRET` — strong JWT secret
  - `CLIENT_URL` — frontend URL after front deploy (e.g. https://your-app.onrender.com)
  - `FIREBASE_PRIVATE_KEY`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PROJECT_ID` (if used)
  - Email credentials if required: `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS`

2) Frontend (Static Site)

- Create a new **Static Site** on Render.
- Connect the same GitHub repo.
- Root Directory: `client`
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`
- Environment variables:
  - `VITE_API_URL` — set to your backend base URL (e.g. `https://<backend>.onrender.com/api`)

3) After both services are deployed:

- Set `CLIENT_URL` in the backend service to the frontend URL.
- Ensure CORS allowed origins include your frontend domain.
- Trigger a redeploy of both services.

Notes:
- If you change `VITE_API_URL` to include `/api` then the client will not append `/api` again.
- Rotate any leaked credentials and do not store secrets in the repo. Use Render's environment variable UI.
