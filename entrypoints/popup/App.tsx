// entrypoints/popup/App.tsx
import React, { useState, useEffect } from "react";
import "./App.css"; // Keep this for any additional styles

const App: React.FC = () => {
  const [isIconVisible, setIsIconVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");

  useEffect(() => {
    const inputField = document.querySelector(
      'input[placeholder="Write a message..."]'
    ); // Update selector as needed

    const showIcon = () => setIsIconVisible(true);
    const hideIcon = () => setIsIconVisible(false);

    inputField?.addEventListener("focus", showIcon);
    inputField?.addEventListener("blur", hideIcon);

    return () => {
      inputField?.removeEventListener("focus", showIcon);
      inputField?.removeEventListener("blur", hideIcon);
    };
  }, []);

  const handleIconClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleGenerate = () => {
    setResponse(
      "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask."
    );
  };
  const handleInsert = () => {
    const inputField = document.querySelector(
      'input[placeholder="Write a message..."]'
    );

    if (inputField) {
      console.log(inputField.nodeValue);
      inputField.nodeValue = response; // Insert the response into LinkedIn input
    }
  };

  return (
    <div className="relative">
      {isIconVisible && (
        <button
          className="absolute bottom-4 right-4 p-2 bg-blue-500 text-white rounded-full shadow-lg"
          onClick={handleIconClick}
        >
          🤖
        </button>
      )}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-lg p-4 w-1/3"
            onClick={(e) => e.stopPropagation()} // Prevent modal close on click inside
          >
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="border border-gray-300 p-2 w-full mb-4 rounded"
              placeholder="Type your command..."
            />
            <div className="flex justify-between">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleGenerate}
              >
                Generate
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={handleInsert}
              >
                Insert
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
            {response && <div className="mt-4 text-gray-700">{response}</div>}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
