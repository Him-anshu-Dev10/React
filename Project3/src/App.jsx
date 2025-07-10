import { useState } from "react";
import "./app.css";
import "./component/Navigation";
import Navigation from "./component/Navigation";
import Hero from "./component/hero";
function App() {
  return (
    <>
      <Navigation />
      <Hero />
    </>
  );
}

export default App;
