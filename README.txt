Checklist CRUD replacement files

1. Frontend
   Replace client/src/App.jsx with App.jsx from this package.
   The frontend uses inline styles and reads VITE_API_URL, falling back to http://localhost:5000.
   In Vercel, set VITE_API_URL to https://checklist-server-6fid.onrender.com and redeploy.

2. Backend
   Replace server/server.js with server.js from this package.
   Keep your existing server/db.js, server/.env, server/.gitignore, and package.json.
   Do not commit .env or share its contents.
   Ensure your Render environment has DATABASE_URL set to the rotated Neon connection string.

3. Deploy order
   - Deploy the updated backend to Render first.
   - Deploy the frontend to Vercel second.

The files use the existing API routes /api/tasks and PostgreSQL table named tasks.
