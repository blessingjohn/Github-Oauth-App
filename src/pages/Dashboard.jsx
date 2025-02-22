import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [repos, setRepos] = useState([]);
  const [selectedRepos, setSelectedRepos] = useState([]); // Multiple selections
  const [repoData, setRepoData] = useState({});
  const token = localStorage.getItem("github_token");

  useEffect(() => {
    const fetchRepos = async () => {
      if (!token) return;
      try {
        const response = await axios.get("https://api.github.com/user/repos", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRepos(response.data);
      } catch (error) {
        console.error("Error fetching repositories:", error);
      }
    };
    fetchRepos();
  }, [token]);

  const handleRepoSelection = async (repo) => {
    const updatedSelection = selectedRepos.includes(repo.full_name)
      ? selectedRepos.filter((r) => r !== repo.full_name) // Remove if already selected
      : [...selectedRepos, repo.full_name]; // Add if not selected

    setSelectedRepos(updatedSelection);

    if (!repoData[repo.full_name]) {
      try {
        const branchRes = await axios.get(
          `https://api.github.com/repos/${repo.full_name}/branches`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const prRes = await axios.get(
          `https://api.github.com/repos/${repo.full_name}/pulls?state=all`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setRepoData((prev) => ({
          ...prev,
          [repo.full_name]: {
            branches: branchRes.data,
            pullRequests: prRes.data,
          },
        }));
      } catch (error) {
        console.error("Error fetching repo data:", error);
      }
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Arial, sans-serif" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "250px",
          background: "#2c3e50",
          color: "#ecf0f1",
          padding: "20px",
          overflowY: "auto",
          flexShrink: 0,
        }}
      >
        <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "15px" }}>
          Repositories
        </h2>
        <ul style={{ listStyle: "none", padding: "0" }}>
          {repos.length > 0 ? (
            repos.map((repo) => (
              <li
                key={repo.id}
                onClick={() => handleRepoSelection(repo)}
                style={{
                  padding: "10px",
                  background: selectedRepos.includes(repo.full_name) ? "#3498db" : "#34495e",
                  marginBottom: "8px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  transition: "0.3s",
                  textAlign: "center",
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedRepos.includes(repo.full_name)}
                  onChange={() => handleRepoSelection(repo)}
                  style={{ marginRight: "8px" }}
                />
                {repo.name}
              </li>
            ))
          ) : (
            <p>Loading repositories...</p>
          )}
        </ul>
      </div>

      {/* Right Side: Centered Repository Details */}
      <div
        style={{
          flex: 1,
          padding: "20px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // Centers content horizontally
        }}
      >
        {selectedRepos.length > 0 ? (
          selectedRepos.map((repoFullName) => {
            const repoDetails = repoData[repoFullName] || { branches: [], pullRequests: [] };
            return (
              <div
                key={repoFullName}
                style={{
                  marginBottom: "30px",
                  padding: "20px",
                  background: "#f8f9fa",
                  borderRadius: "8px",
                  boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                  width: "100%",
                  maxWidth: "600px", // Ensures the cards don't stretch too much
                  textAlign: "center", // Centers text inside the cards
                }}
              >
                {/* Clickable Repo Name */}
                <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "5px" }}>
                  <a
                    href={`https://github.com/${repoFullName}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#2980b9", textDecoration: "none" }}
                  >
                    {repoFullName}
                  </a>
                </h2>

                {/* Branches */}
                <h3
                  style={{
                    fontSize: "18px",
                    marginTop: "10px",
                    borderBottom: "2px solid #3498db",
                    paddingBottom: "5px",
                  }}
                >
                  Branches
                </h3>
                <ul style={{ listStyle: "none", padding: "0" }}>
                  {repoDetails.branches.length > 0 ? (
                    repoDetails.branches.map((branch) => (
                      <li key={branch.name} style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                        {branch.name}
                      </li>
                    ))
                  ) : (
                    <p>Loading branches...</p>
                  )}
                </ul>

                {/* Pull Requests */}
                <h3
                  style={{
                    fontSize: "18px",
                    marginTop: "10px",
                    borderBottom: "2px solid #e74c3c",
                    paddingBottom: "5px",
                  }}
                >
                  Pull Requests
                </h3>
                <ul style={{ listStyle: "none", padding: "0" }}>
                  {repoDetails.pullRequests.length > 0 ? (
                    repoDetails.pullRequests.map((pr) => (
                      <li key={pr.id} style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                        <a
                          href={pr.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "#2980b9", textDecoration: "none" }}
                        >
                          #{pr.number} {pr.title}
                        </a>
                        <p style={{ fontSize: "12px", color: "#7f8c8d" }}>
                          By {pr.user.login} | {pr.state.toUpperCase()} |{" "}
                          {new Date(pr.created_at).toLocaleDateString()}
                        </p>
                      </li>
                    ))
                  ) : (
                    <p>No PRs found.</p>
                  )}
                </ul>
              </div>
            );
          })
        ) : (
          <h2 style={{ textAlign: "center", color: "#7f8c8d" }}>
            Select repositories from the left panel
          </h2>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
