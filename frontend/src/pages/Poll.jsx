import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function PollDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [poll, setPoll] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [voted, setVoted] = useState(false);

  // Fetch Poll Data
  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/poll/${id}`);
        setPoll(response.data.data || {});
      } catch (err) {
        console.error("Error fetching poll by ID", err);
      }
    };
    fetchPoll();
  }, [id]);

  // Handle Voting
  const handleVote = async () => {
    if (selectedOption === null) {
      alert("Please select an option before voting!");
      return;
    }

    try {
      const response = await axios.post(`http://localhost:8000/api/v1/poll/${id}/vote`, { optionIndex: selectedOption });
      setPoll(response.data);
      setVoted(true);

      alert("Voted successfully!");

      // Redirect to Home Page after voting
      console.log(id);
      
       navigate(`/poll/${id}/voted`)
    } catch (error) {
      console.error("Error voting:", error);
    }
    
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-lg bg-white shadow-2xl rounded-xl p-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">{poll?.question}</h1>

        <div className="space-y-4">
          {poll?.options?.map((option, index) => (
            <div key={index} className="flex items-center space-x-4">
              {/* Radio button */}
              <input
                id={`option-${index}`}  // unique id for each option
                type="radio"
                name="poll-option"  // same name to make them behave as radio buttons
                value={index}
                checked={selectedOption === index}
                onChange={() => setSelectedOption(index)}
                disabled={voted}
                className="w-6 h-6 text-teal-600 border-gray-300 focus:ring-teal-500 cursor-pointer"
              />
              {/* Label is clickable and linked to the radio button */}
              <label 
                htmlFor={`option-${index}`}  // links the label to the radio button
                className="text-lg text-gray-700 font-medium cursor-pointer"
              >
                {option?.text} 
              </label>
            </div>
          ))}
        </div>

        <button
          onClick={handleVote}
          disabled={voted}
          className={`w-full mt-6 px-4 py-2 text-white font-semibold rounded-lg ${
            voted ? "bg-gray-400 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-700 transition duration-300"
          }`}
        >
          {voted ? "Voted!" : "Vote"}
        </button>
      </div>
    </div>
  );
}

export default PollDetails;
