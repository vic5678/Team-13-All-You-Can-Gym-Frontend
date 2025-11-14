# All You Can Gym — React Frontend

## Quick start
```bash
npm install
cp .env.example .env
npm start
```
Edit `.env` to point `REACT_APP_API_BASE_URL` at your backend.

## Pages
- `/login` — simple login (stores a demo token + userId)
- `/packages` — view & buy packages
- `/gyms` — list/search/filter gyms
- `/sessions` — list/search sessions, book
- `/activity` — upcoming sessions, cancel, announcements

## API
Axios instance at `src/api/axios.js` reads `REACT_APP_API_BASE_URL` and attaches `Authorization` if available.
Endpoints are implemented per the provided OpenAPI.
Note: For `POST /users/{userId}/sessions/upcoming` we include `sessionId` in the **body** since the path in the spec lacks it.
