import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const getAccessToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      const dashboard = urlParams.get("dashboard") || "dashboard"; // Default to Question 1

      if (!code) {
        console.error("No code found in URL");
        return;
      }

      try {
        const response = await axios.post("http://localhost:5000/auth/github", {
          code,
        });

        const { token } = response.data;
        if (token) {
          localStorage.setItem("github_token", token); // Store token
          navigate(`/${dashboard}`); // Redirect to the selected dashboard
        }
      } catch (error) {
        console.error("OAuth Error:", error);
      }
    };

    getAccessToken();
  }, [navigate]);

  return <h1>Authenticating...</h1>;
};

export default OAuthCallback;
