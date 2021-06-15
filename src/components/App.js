import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

// Component Hierarchy:
// App
// 1. make a GET request to /toys to fetch the toy array
// 2. pass array to ToyContainer
// 3. map array to render each object in ToyCard
// --Header - don't update
// --ToyForm
// 1. make a POST request to /toys to save a new toy to the server. 
// 2. ensure new toy is properly passed to toycontainer > toycard with a controlled form
// --ToyContainer
//   |--ToyCard
// 1. make a DELETE request to /toys/:id to delete the toy from server 
// 2. ToyCard that you clicked on should also be removed from the DOM. State changed at App level (toy Data)
// 3. make a PATCH request to /toys/:id along with the new number of likes to update the toy on the server USE LIKESTATE
// 4. Clicking on the button should also increase the number of likes on the DOM. USE LIKESTATE

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toyData, setToyData] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/toys')
    .then(r => r.json())
    .then(data => setToyData(data))
  }, [])

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function onToySubmit(newToy) {
    // console.log(toyData)
    // console.log(newToy)
    setToyData([...toyData, newToy])
  }

  function onDelete(deleteToy) {
    let filteredToy = toyData.filter(toy => toy.id !== deleteToy.id )
    setToyData(filteredToy)
  }

  function onLikesPassUp(id, newLikes) {
    let likedToy = toyData.map(toy => {
      if (toy.id === id) {
        return {
          id: toy.id, 
          name: toy.name, 
          image: toy.image, 
          likes: newLikes
        }
      } else {
        return toy
      }
    })
    setToyData(likedToy)
  }


  return (
    <>
      <Header />
      {showForm ? <ToyForm onToySubmit={onToySubmit} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toyData} onDelete={onDelete} onLikesPassUp={onLikesPassUp}/>
    </>
  );
}

export default App;
