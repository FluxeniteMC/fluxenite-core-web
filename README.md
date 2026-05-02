# Fluxenite Website

A clean, minimal personal brand website for Fluxenite — an individual nonprofit open-source developer.

## Features

- **Home** — Hero, GitHub repos floating carousel (auto-scrolls), latest blog/news, email subscribe
- **About** — Mission, values, how we work
- **Blog** — Full CRUD powered by Firestore (admin/editor only)
- **News** — Same as Blog, separate collection
- **Contact** — Form saved to Firestore
- **Subscribe** — Email list saved to Firestore
- **Sign In / Register** — Firebase Auth (email + Google)
- **Admin Dashboard** — Secret board (admin only) with:
  - User management (view all users, assign roles: user/editor/admin)
  - Blog & News editor (create, edit, delete)
  - Contact messages inbox
  - Subscribers list

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
Your `.env` is already filled in. If you need to reset:
```
REACT_APP_FIREBASE_API_KEY=...
REACT_APP_FIREBASE_AUTH_DOMAIN=...
REACT_APP_FIREBASE_PROJECT_ID=...
REACT_APP_FIREBASE_STORAGE_BUCKET=...
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=...
REACT_APP_FIREBASE_APP_ID=...
REACT_APP_FIREBASE_MEASUREMENT_ID=...
REACT_APP_ADMIN_EMAIL=bdgamer9191@gmail.com
REACT_APP_ADMIN_UID=aiXPxaiTXhNwN8V7nE7fikCnCj53
REACT_APP_GITHUB_ORG=FluxeniteMC
```

### 3. Set up Firestore rules
Copy `firestore.rules` and deploy via Firebase CLI:
```bash
firebase deploy --only firestore:rules
```

### 4. Enable Firebase Auth
In Firebase Console → Authentication → Sign-in methods:
- Enable **Email/Password**
- Enable **Google**

### 5. Run the app
```bash
npm start
```

## Admin Access
- Sign in with `bdgamer9191@gmail.com`
- The `/admin` route will appear in the navbar
- From there you can manage users, blogs, news, contacts, and subscribers

## Giving Editor Access
1. Go to `/admin` → Users tab
2. Find the user's row
3. Change their role from `user` to `editor`
4. They can now create/edit/delete blog and news posts

## Project Structure
```
src/
├── components/     Navbar, Footer
├── context/        AuthContext (Firebase Auth)
├── pages/          Home, About, Blog, News, Contact, Subscribe, SignIn, Register, Admin
├── firebase.js     Firebase config
└── index.css       Global styles
```
