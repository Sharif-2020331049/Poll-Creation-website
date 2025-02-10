import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

function Result() {
  const { id } = useParams();
  const [poll, setPoll] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/poll/${id}`);
        setPoll(response.data.data);
      } catch (error) {
        console.error("Error fetching poll details by ID in Result page");
      }
    };
    fetchPoll();
  }, [id]);

  // Calculate total votes
  const totalVotes = poll?.options?.reduce((sum, option) => sum + option.vote, 0);

  // Prepare data for bar chart
  const chartData = poll?.options?.map((option) => ({
    name: option.text,
    value: totalVotes > 0 ? ((option.vote / totalVotes) * 100).toFixed(1) : 0, // percentage calculation
  }));

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-xl p-8">
        {/* Header */}
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-4">Poll Results</h1>
        <p className="text-lg text-gray-700 text-center mb-6">
          <span className="font-semibold text-teal-600">Total Votes:</span> {totalVotes}
        </p>

        {/* Bar Chart */}
        <div className="flex justify-center mb-6">
          <BarChart width={500} height={300} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#0088FE" />
          </BarChart>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition duration-300"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default Result;
