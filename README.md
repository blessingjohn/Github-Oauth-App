# 🚀 GitHub OAuth App – Repository & Branch Viewer

## 📌 Project Overview

This is a **GitHub OAuth-powered web application** that allows users to:  
✔ Authenticate via **GitHub OAuth**  
✔ Fetch and **select multiple repositories**  
✔ View **branches** of selected repositories in a visually structured format  
✔ (Bonus) View **pull requests** (open & closed) with metadata

---

## 🛠 Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express
- **Authentication:** GitHub OAuth
- **API:** GitHub REST API

---

## 🎯 Features

✅ **GitHub OAuth Authentication** – Secure login using GitHub OAuth.  
✅ **Repository Selection** – Fetch user repositories & allow multiple selections.  
✅ **Branch Visualization** – Display branches in an intuitive UI.  
✅ **PR Overview (Bonus)** – Show open & closed PRs with author and status.

---

## 🚀 Setup Instructions

### 🖥 1. Clone the Repository

```bash
git clone https://github.com/blessingjohn/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

---

### 📌 2. Backend Setup

#### Install dependencies:

```bash
cd backend
npm install
```

#### Create a `.env` file in the `backend` folder:

```plaintext
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_REDIRECT_URI=http://localhost:5173/oauth-callback
SESSION_SECRET=your_random_session_secret
```

#### Run the backend server:

```bash
node server.js
```

(Default port: `5000`)

---

### 🎨 3. Frontend Setup

#### Install dependencies:

```bash
cd frontend
npm install
```

#### Create a `.env` file in the `frontend` folder:

```plaintext
VITE_GITHUB_CLIENT_ID=your_github_client_id
VITE_BACKEND_URL=http://localhost:5000
```

#### Run the React frontend:

```bash
npm run dev
```

(Default port: `5173`)

---

## 🔑 How Authentication Works

1. User clicks **"Login with GitHub"**.
2. Redirects to GitHub's OAuth page.
3. Upon successful login, GitHub redirects back with a `code`.
4. The backend exchanges `code` for an **access token**.
5. The token is stored and used to fetch repositories, branches, and PRs.

---

## 🖼 Screenshots

🚀 **Login Page**  
![Login](https://via.placeholder.com/800x400?text=Login+Page)

📌 **Repository List**  
![Repositories](https://via.placeholder.com/800x400?text=Repositories+List)

🌿 **Branch Viewer**  
![Branches](https://via.placeholder.com/800x400?text=Branch+Viewer)

---

## 🎥 Demo Video

📺 [Watch the demo here](#) _(Upload your demo video link)_

---

## 🤝 Contributing

1. **Fork** the repo
2. **Create a feature branch** (`git checkout -b feature-name`)
3. **Commit your changes** (`git commit -m "Added new feature"`)
4. **Push to GitHub** (`git push origin feature-name`)
5. Open a **Pull Request**

---

### ✅ Final Checklist Before Submission:

✔ All functionality working (Auth, Repo Selection, Branch Viewer, PRs).  
✔ README complete with setup instructions & authentication flow.  
✔ Demo video recorded & linked.  
✔ Hosted on a server if possible.
