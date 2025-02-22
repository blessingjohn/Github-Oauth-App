import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const Question2Dashboard = ({ token }) => {
  const [repos, setRepos] = useState([]);
  const [selectedRepos, setSelectedRepos] = useState([]);
  const [repoData, setRepoData] = useState({});
  const [timeRange, setTimeRange] = useState("3m");
  const [selectedMetric, setSelectedMetric] = useState("pr_merged");
  const [contributors, setContributors] = useState({});
  const [visibleContributors, setVisibleContributors] = useState({});

  useEffect(() => {
    if (!token) return;
    const fetchRepos = async () => {
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
    const alreadySelected = selectedRepos.some((r) => r.full_name === repo.full_name);
    if (alreadySelected) {
      setSelectedRepos(selectedRepos.filter((r) => r.full_name !== repo.full_name));
      return;
    }
    setSelectedRepos([...selectedRepos, repo]);

    if (!repoData[repo.full_name]) {
      try {
        const prRes = await axios.get(
          `https://api.github.com/repos/${repo.full_name}/pulls?state=all`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const branchRes = await axios.get(
          `https://api.github.com/repos/${repo.full_name}/branches`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const contributorRes = await axios.get(
          `https://api.github.com/repos/${repo.full_name}/contributors`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setRepoData((prev) => ({
          ...prev,
          [repo.full_name]: {
            pullRequests: prRes.data,
            branches: branchRes.data,
            contributors: contributorRes.data,
          },
        }));

        setContributors((prev) => ({
          ...prev,
          [repo.full_name]: contributorRes.data.map((c) => c.login),
        }));
      } catch (error) {
        console.error("Error fetching repository data:", error);
      }
    }
  };

  const processPRData = (repo) => {
    if (!repoData[repo.full_name]?.pullRequests) return {};
    const prCounts = {};
    const prMergeTimes = {};
    const branchActivity = {};

    repoData[repo.full_name].pullRequests.forEach((pr) => {
      if (!pr.merged_at) return;
      const createdDate = new Date(pr.created_at);
      const mergedDate = new Date(pr.merged_at);
      const monthYear = `${createdDate.getFullYear()}-${createdDate.getMonth() + 1}`;

      prCounts[monthYear] = (prCounts[monthYear] || 0) + 1;
      prMergeTimes[monthYear] = prMergeTimes[monthYear]
        ? [...prMergeTimes[monthYear], (mergedDate - createdDate) / (1000 * 3600 * 24)]
        : [(mergedDate - createdDate) / (1000 * 3600 * 24)];
    });

    branchActivity["total"] = repoData[repo.full_name]?.branches.length || 0;

    return {
      pr_merged: prCounts,
      avg_merge_time: Object.keys(prMergeTimes).reduce((acc, key) => {
        acc[key] = prMergeTimes[key].reduce((a, b) => a + b, 0) / prMergeTimes[key].length;
        return acc;
      }, {}),
      branch_activity: branchActivity,
    };
  };

  const getRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  const chartData = {
    labels: Object.keys(selectedRepos.length > 0 ? processPRData(selectedRepos[0])[selectedMetric] || {} : {}),
    datasets: selectedRepos.map((repo) => {
      const data = processPRData(repo)[selectedMetric] || {};
      return {
        label: repo.full_name,
        data: Object.values(data),
        borderColor: getRandomColor(),
        borderWidth: 2,
        fill: false,
      };
    }),
  };

  const toggleContributor = (repo, contributor) => {
    setVisibleContributors((prev) => ({
      ...prev,
      [repo]: prev[repo] ? { ...prev[repo], [contributor]: !prev[repo][contributor] } : { [contributor]: true },
    }));
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Arial, sans-serif" }}>
      {/* Sidebar */}
      <div style={{ width: "250px", background: "#2c3e50", color: "#ecf0f1", padding: "20px", overflowY: "auto" }}>
        <h2>Repositories</h2>
        <ul style={{ listStyle: "none", padding: "0" }}>
          {repos.map((repo) => (
            <li key={repo.id} style={{ marginBottom: "10px", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={selectedRepos.some((r) => r.full_name === repo.full_name)}
                onChange={() => handleRepoSelection(repo)}
              />
              {repo.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        {selectedRepos.length > 0 ? (
          <>
            <h2>Repository Metrics</h2>
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
              <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
                <option value="3m">Last 3 Months</option>
                <option value="6m">Last 6 Months</option>
                <option value="custom">Custom</option>
              </select>
              <select value={selectedMetric} onChange={(e) => setSelectedMetric(e.target.value)}>
                <option value="pr_merged">PRs Merged</option>
                <option value="avg_merge_time">Avg Merge Time</option>
                <option value="branch_activity">Branch Activity</option>
              </select>
            </div>
            <Line data={chartData} />

            <h3>Contributors</h3>
            {selectedRepos.map((repo) => (
              <div key={repo.full_name}>
                <h4>{repo.name}</h4>
                {contributors[repo.full_name]?.map((contributor) => (
                  <button key={contributor} onClick={() => toggleContributor(repo.full_name, contributor)}>
                    {visibleContributors[repo.full_name]?.[contributor] ? "👁" : "🚫"} {contributor}
                  </button>
                ))}
              </div>
            ))}
          </>
        ) : (
          <h2>Select repositories from the left panel</h2>
        )}
      </div>
    </div>
  );
};

export default Question2Dashboard;
 