import React from "react";
import LoginButton from "../components/LoginButton";

const Home = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
        backgroundColor: "#f3f4f6", // Equivalent to bg-gray-100
      }}
    >
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
        GitHub OAuth App
      </h1>
      <LoginButton targetDashboard="dashboard" /> {/* Question 1 Dashboard */}
      <LoginButton targetDashboard="question2-dashboard" /> {/* Question 2 Dashboard */}
    </div>
  );
};

export default Home;
