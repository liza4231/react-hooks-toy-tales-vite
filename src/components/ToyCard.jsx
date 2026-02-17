import React from "react";

const API_BASE = "http://localhost:3001/toys";

function ToyCard({ toy, onDeleteToy, onUpdateToy }) {
  const { id, name, image, likes } = toy;

  function handleLike() {
    const newLikes = likes + 1;

    fetch(`${API_BASE}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: newLikes }),
    })
      .then((r) => r.json())
      .then((updatedToy) => onUpdateToy(updatedToy))
      .catch((err) => console.error(err));
  }

  function handleDelete() {
    fetch(`${API_BASE}/${id}`, { method: "DELETE" })
      .then((r) => {
        if (r.ok) onDeleteToy(id);
      })
      .catch((err) => console.error(err));
  }

  return (
    <div className="card" data-testid="toy-card">
      <h2>{name}</h2>
      <img src={image} alt={name} className="toy-avatar" />
      <p>{likes} Likes </p>
      <button className="like-btn" onClick={handleLike}>
        Like {"<3"}
      </button>
      <button className="del-btn" onClick={handleDelete}>
        Donate to GoodWill
      </button>
    </div>
  );
}

export default ToyCard;