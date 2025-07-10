import { useState, useCallback } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllow, setNumAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [password, setPassword] = useState("");

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllow) str += "0123456789";
    if (charAllow) str += "!@#$%^&*()_-+[]{}";

    for (let i = 0; i < length; i++) {
      let charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }
    setPassword(pass);
  }, [length, numberAllow, charAllow, setPassword]);

  // Optional: Add a useEffect to generate password on initial render or state changes
  // import { useEffect } from "react";
  // useEffect(() => {
  //   generatePassword();
  // }, [length, numberAllow, charAllow, generatePassword]);

  return (
    // Add these classes to the outer div to center the content
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      {" "}
      {/* Added bg-gray-900 for better contrast */}
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg my-8 text-orange-500 bg-gray-700 p-4">
        <h1 className="text-white text-center text-2xl mb-4">
          Password Generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
          />
          <button
            onClick={generatePassword}
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
          >
            Generate
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(Number(e.target.value));
              }}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={numberAllow}
              id="numberInput"
              onChange={() => setNumAllow((prev) => !prev)}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={charAllow}
              id="characterInput"
              onChange={() => setCharAllow((prev) => !prev)}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
