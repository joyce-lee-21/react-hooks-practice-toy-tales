import React, { useState } from "react";

// When the ToyForm is submitted, make a POST request to /toys to save a new toy to the server. Using the ideas of controlled form and inverse data flow, think about how to render a new ToyCard for the toy that you created.

function ToyForm({ onToySubmit }) {
  const [name, setName] = useState("")
  const [image, setImage] = useState("")

  function handleFormSubmit(e) {
    e.preventDefault()
    const newToyObj = {
      id: "",
      name: name,
      image: image,
      likes: 0
    }

    fetch('http://localhost:3001/toys', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newToyObj)
    })
    .then(r => r.json())
    .then(data => onToySubmit(data))
  }
  console.log(name)
  console.log(image)

  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleFormSubmit}>
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
          onChange={e => setName(e.target.value)}
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          onChange={e => setImage(e.target.value)}
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;
