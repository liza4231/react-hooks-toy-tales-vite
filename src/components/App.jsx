import React, { useState, useEffect } from "react";


import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

const API = "http://localhost:3001/toys";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  // GET /toys on load
  useEffect(() => {
    fetch(API)
      .then((r) => r.json())
      .then(setToys)
      .catch((err) => console.error(err));
  }, []);

  function handleClick() {
    setShowForm((s) => !s);
  }

  // POST /toys
  function handleAddToy(newToy) {
    setToys((prev) => [...prev, newToy]);
  }

  // DELETE /toys/:id
  function handleDeleteToy(id) {
    setToys((prev) => prev.filter((toy) => toy.id !== id));
  }

  // PATCH /toys/:id (likes)
  function handleUpdateToy(updatedToy) {
    setToys((prev) =>
      prev.map((toy) => (toy.id === updatedToy.id ? updatedToy : toy))
    );
  }

  return (
    <>
      <Header />

      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}

      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>

      <ToyContainer
        toys={toys}
        onDeleteToy={handleDeleteToy}
        onUpdateToy={handleUpdateToy}
      />
    </>
  );
}

export default App;
