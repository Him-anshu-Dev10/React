import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [text, setText] = useState("");
  const [translated, setTranslated] = useState("");
  const [language, setLanguage] = useState("hi"); // default Hindi
  const [loading, setLoading] = useState(false);

  const languages = [
    { code: "hi", name: "Hindi" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "ja", name: "Japanese" },
    { code: "zh", name: "Chinese (Simplified)" },
    { code: "zh-TW", name: "Chinese (Traditional)" },
    { code: "ar", name: "Arabic" },
    { code: "ru", name: "Russian" },
    { code: "it", name: "Italian" },
    { code: "pt", name: "Portuguese" },
    { code: "ko", name: "Korean" },
    { code: "tr", name: "Turkish" },
    { code: "bn", name: "Bengali" },
    { code: "ta", name: "Tamil" },
    { code: "te", name: "Telugu" },
    { code: "mr", name: "Marathi" },
    { code: "gu", name: "Gujarati" },
    { code: "pa", name: "Punjabi" },
    { code: "ur", name: "Urdu" },
  ];

  const handleTranslate = async () => {
    if (!text) return;
    setLoading(true);

    try {
      const options = {
        method: "POST",
        url: "https://text-translator2.p.rapidapi.com/translate",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "X-RapidAPI-Key":
            "5d44a30b2bmsh74480eb900dc84bp1ea55bjsnc46f2457914e",
          "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
        },
        data: new URLSearchParams({
          source_language: "en",
          target_language: language,
          text: text,
        }),
      };

      const response = await axios.request(options);
      setTranslated(response.data.data.translatedText);
    } catch (error) {
      console.error(error);
      setTranslated("❌ Error in translation.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">
          🌍 Text Translator
        </h1>

        <textarea
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          rows="4"
          placeholder="Enter text in English..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>

        <div className="mt-4">
          <label className="block text-sm font-medium mb-2">
            Translate to:
          </label>
          <select
            className="w-full p-2 border rounded-lg"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleTranslate}
          disabled={loading}
          className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-black py-2 px-4 rounded-lg transition"
        >
          {loading ? "Translating..." : "Translate"}
        </button>

        {translated && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg border">
            <h2 className="font-semibold text-lg mb-2">Translated Text:</h2>
            <p className="text-gray-800">{translated}</p>
          </div>
        )}
      </div>
    </div>
  );
}
