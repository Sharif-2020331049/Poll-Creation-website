import React from "react";
import { useParams, useNavigate } from "react-router-dom";

function Voted() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-2xl rounded-2xl p-12 w-full max-w-2xl text-center">
        {/* Success Message with Emoji */}
        <h1 className="text-4xl font-bold text-green-600 flex items-center justify-center gap-2">
          🎉 You Voted Successfully! 🎉
        </h1>
        <p className="text-lg text-gray-700 mt-4">Thank you for your participation.</p>

        {/* Buttons Side-by-Side */}
        <div className="mt-8 flex justify-center gap-6">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 text-lg text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition"
          >
            ⬅️ Home
          </button>

          <button
            onClick={() => navigate(`/poll/${id}/result`)}
            className="px-6 py-3 text-lg text-white bg-green-500 hover:bg-green-600 rounded-lg transition"
          >
            📊 See Results
          </button>
        </div>
      </div>
    </div>
  );
}

export default Voted;
