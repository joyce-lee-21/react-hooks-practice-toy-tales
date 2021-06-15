import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({ toys, onDelete, onLikesPassUp }) {
  // console.log(toys)

  return (
    <div id="toy-collection">
      {toys.map(toy => 
        <ToyCard 
          key={toy.id}
          id={toy.id}
          name={toy.name}
          image={toy.image}
          likes={toy.likes}
          onDelete={onDelete}
          onLikesPassUp={onLikesPassUp}
        />
      )}
    </div>
  );
}

export default ToyContainer;
