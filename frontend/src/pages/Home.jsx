import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PollCard from "../components/PollCard"; // Import PollCard Component

function Home() {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/poll")
      .then((response) => {
        console.log("API Response:", response.data.data);
        setPolls(response.data.data || []); // Ensure data exists
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching polls:", error);
        setError("Failed to fetch polls. Please try again.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">📊 All Polls</h1>

      {/* Create Poll Button */}
      <Link
        to="/poll/create"
        className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition mb-6"
      >
        ➕ Create a New Poll
      </Link>

      {/* Loading or Error Message */}
      {loading && <p className="text-gray-600">Loading polls...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Poll List */}
      <div className="w-full max-w-lg">
        {polls.length > 0 ? (
          polls.map((poll) => <PollCard key={poll._id} poll={poll} />)
        ) : (
          !loading && <p className="text-gray-500">No polls available.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
