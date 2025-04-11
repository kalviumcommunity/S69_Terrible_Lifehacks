import React from "react";
import "./App.css";
import EntityCard from "./components/EntityCard"; // Importing the component

function App() {
  const entityData = {
    name: "SleekView",
    description: "Use sunglasses as a quick phone stand when watching videos.!!",
  };

  return (
    <div className="app">
      <header className="hero">
        <h1>Terrible LifeHacks</h1>
        <p>Questionable Tips. Odd Solutions. Awful Tricks</p>
        <button>💡 View Hacks!! 💡</button>
      </header>

      {/* Rendering the EntityCard component with dummy data */}
      <section className="entity-section">
        <EntityCard name={entityData.name} description={entityData.description} />
      </section>
    </div>
  );
}

export default App;