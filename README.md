# All You Can Gym — React Frontend
## Description
A mobile app offering access to a wide network of partner gyms through subscription packages. Book sessions, track progress and connect with friends for a fun, social fitness experience-anytime, anywhere.

## Quick start
```bash
npm install
cp .env.example .env
npm start
```
Edit `.env` to point `REACT_APP_API_BASE_URL` at your backend.
## Installation
1. Clone the repository:
   ```
   git clone https://github.com/vic5678/Team-13-All-You-Can-Gym-Frontend.git
   ```
2. Navigate to the project directory:
   ```
   cd all-you-can-gym
   ```
3. Install the dependencies:
   ```
   npm install
   ```
4. Create a `.env` file based on the `.env.example` file and fill in the required environment variables.

## Usage
1. Start the development:
   ```
   npm start
   ```
2. The server will run on `http://localhost:3001` by default. (If not press y in the relevant question)

## 📄 Frontend Pages

Below is the complete list of pages currently included in the frontend application.

## 🔐 Authentication
- **`/login`** — User login (`Login.jsx`) / Admin login

---


### 🏠 Main User Dashboard
- **`/dashboard`** — Main dashboard after login for the unsubscribed user (`Dashboard.jsx`)
- **`/dashboard`** — Main dashboard after login for the subscribed user (`Dashboard.jsx`)

---

### 🏋️ Gyms
- **`/gyms`** — View all gyms (`Gyms.jsx`)
- **`/search-gyms`** — Search/filter gyms (`SearchGyms.jsx`)

---

### 📅 Sessions
- **`/search-sessions`** — Search/ filter available sessions (`SearchSessions.jsx`)
- **`/activity`** – User activity / history (protected).


---

### 🛠️ Admin — Session Management
- **`/AdminHome`** — Gym admin home (`AdminHome.jsx`)
- **`/admin/sessions`** — View all admin sessions (`AdminSessions.jsx`)
- **`/admin/session/create-session`** — Create a new session (`CreateSession.jsx`)
- **`/admin/session/edit-session`** — Edit/delete an existing session (`AdminSessions.jsx`)


---

### 💳 Subscriptions & Payments
- **`/SubscriptionPackages`** — View all subscription packages (`SubscriptionPackages.jsx`)
- - **`/plan/:id`** — View a specific package (`SubscriptionPackage.jsx`)
- **`/payment`** — Payment page (`PaymentPage.jsx`)
- **`/subscription-management`** — Manage user subscriptions (`SubscriptionManagement.jsx`)

---


## API
Axios instance at `src/api/axios.js` reads `REACT_APP_API_BASE_URL` and attaches `Authorization` if available.
Endpoints are implemented per the provided OpenAPI.
Note: For `POST /users/{userId}/sessions/upcoming` we include `sessionId` in the **body** since the path in the spec lacks it.
