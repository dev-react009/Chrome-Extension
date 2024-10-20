import { useState } from "react";
import "./App.css";

function App() {

    const handleClosePopup = () => {
      window.close(); 
    };
  return (
    <div className="logo">
      <div className="flex flex-col items-center p-[30px] gap-3">
        <img src="/wxt.svg" alt="" className="h-8 w-8 bg-black rounded-full " />
        <h1 className="text-lg font-bold">ChatGpt Writer</h1>
      </div>
      <div className="pl-[30px] pr-[30px] ">
        <p className="text-base font-semibold text-slate- mb-2 text-center">
          Welcome to ChatGPT Writer
        </p>
        <p className="text-sm text-center">
          ChatGPT Writer is a Chrome extension that helps you generate messages
          faster and more effectively.
        </p>
        <div className="mt-4 flex justify-center items-center">
          <button
            onClick={handleClosePopup}
            className="bg-black text-white pb-[5px] pt-[6px] w-52 rounded-md hover:bg-green"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
