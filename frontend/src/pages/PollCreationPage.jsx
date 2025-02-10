import axios from 'axios';
import React, { useState } from 'react';

function PollCreationPage() {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);

  const addOption = () => {
    setOptions([...options, '']);
  };

  const updateOption = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedOptions = options.map((text) => ({ text, vote: 0 }));
    try {
      // http://localhost:8000/api/v1/poll
      await axios.post('http://localhost:8000/api/v1/poll/create', { question, options: formattedOptions });
      alert("Poll Created Successfully!");
      setQuestion('');
      setOptions(['', '']);
    } catch (error) {
      console.error("Error creating poll:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Create a Poll</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Poll Question Input */}
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Poll Question"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Poll Options */}
          {options.map((option, index) => (
            <input
              key={index}
              type="text"
              value={option}
              onChange={(e) => updateOption(index, e.target.value)}
              placeholder={`Option ${index + 1}`}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          ))}

          {/* Add Option Button */}
          <button
            type="button"
            onClick={addOption}
            className="w-full py-2 text-white bg-green-500 hover:bg-green-600 rounded-lg transition"
          >
            ➕ Add Option
          </button>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition"
          >
            ✅ Create Poll
          </button>
        </form>
      </div>
    </div>
  );
}

export default PollCreationPage;
