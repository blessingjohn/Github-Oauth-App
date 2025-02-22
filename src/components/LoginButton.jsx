import React from "react";

const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;
const BASE_REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI; // Base redirect URI

const LoginButton = ({ targetDashboard }) => {
  const handleLogin = () => {
    const REDIRECT_URI = `${BASE_REDIRECT_URI}?dashboard=${targetDashboard}`;
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=repo,user&redirect_uri=${REDIRECT_URI}`;
    window.location.href = githubAuthUrl;
  };

  return (
    <button
      onClick={handleLogin}
      style={{
        padding: "10px 16px",
        margin: "10px",
        backgroundColor: "#3b82f6", // Tailwind's bg-blue-500
        color: "#ffffff", // Text color white
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
        fontSize: "16px",
        transition: "background-color 0.3s ease",
      }}
      onMouseOver={(e) => (e.target.style.backgroundColor = "#2563eb")} // Tailwind's hover:bg-blue-600
      onMouseOut={(e) => (e.target.style.backgroundColor = "#3b82f6")}
    >
      {targetDashboard === "dashboard"
        ? "Login to Question 1 Dashboard"
        : "Login to Question 2 Dashboard"}
    </button>
  );
};

export default LoginButton;
