import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

const FavouriteButton = ({ speciesName, speciesID, userID, setAddFave }) => {
  //firebase firestore collection to access a users favourite species.
  const collectionRef = collection(db, "favourites", userID, "species");

  //when the favourite button is clicked this function runs where it adds the species id and name to the database under the users id
  function addFave() {
    const newFave = {
      speciesID,
      speciesName,
    };
    //adds the document to the firestore database and when the promise resolves it consoles log a message
    addDoc(collectionRef, newFave).then(() => {
      console.log("Item added to favourites");
    });
    //this is for functionality to be added, when we have a favourites page, it will need to update when this value changes
    setAddFave(true);
  }

  return (
    <div className="favouriteButtonContainer">
      <button
        className="faveButton"
        onClick={() => {
          addFave();
        }}
      >
        Favourite!
      </button>
    </div>
  );
};

export default FavouriteButton;
