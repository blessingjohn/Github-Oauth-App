import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import OAuthCallback from "./pages/OAuthCallback";
import Dashboard from "./pages/Dashboard"; // Question 1 Dashboard
import Question2Dashboard from "./pages/Question2Dashboard"; // Question 2 Dashboard

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("github_token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard token={token} />} /> {/* Question 1 */}
        <Route path="/question2-dashboard" element={<Question2Dashboard token={token} />} /> {/* Question 2 */}
        <Route path="/oauth-callback" element={<OAuthCallback />} />
      </Routes>
    </Router>
  );
}

export default App;
