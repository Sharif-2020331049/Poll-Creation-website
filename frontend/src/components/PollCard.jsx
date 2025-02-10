import React from "react";
import { Link } from "react-router-dom";

function PollCard({ poll }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mb-4 w-full">
      <h2 className="text-lg font-bold text-gray-800">{poll.question}</h2>
      <Link
        to={`/poll/${poll._id}`}
        className="block text-blue-500 hover:text-blue-700 mt-2"
      >
        🗳️ Vote Now →
      </Link>
    </div>
  );
}

export default PollCard;
