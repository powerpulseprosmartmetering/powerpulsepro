# PowerPulsePro

This repository contains the PowerPulsePro MERN stack application (frontend in `client/`, backend in `server/`).

See `DEPLOYMENT_GUIDE.md` for detailed deployment notes. Use the provided `.env.example` files as a starting point.

Local quick start:

1. Install dependencies:

```bash
npm run install-all
```

2. Run backend and frontend in development (in separate terminals):

```bash
npm --prefix server run dev
npm --prefix client run dev
```

3. Build frontend for production:

```bash
npm --prefix client run build
```
