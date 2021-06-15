import React from "react";

function ToyCard({ id, name, image, likes, onDelete, onLikesPassUp }) {

  function handleDelete() {
    // console.log(id)
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE",
      headers: {
      "Content-Type": "application/json"
      }
    })
    const deleteToy = {
      id: id,
    }
    onDelete(deleteToy)
  }

  function handleLikes() {
    // console.log(likes + 1)
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        likes: likes + 1
      })
    })
    .then(r => r.json())
    .then(data => onLikesPassUp(data.id, data.likes))
  }
  return (
    <div className="card">
      <h2>{name}</h2>
      <img
        src={image}
        alt={name}
        className="toy-avatar"
      />
      <p>{likes} Likes </p>
      <button className="like-btn" onClick={handleLikes}>Like {"<3"}</button>
      <button className="del-btn" onClick={handleDelete}>Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
