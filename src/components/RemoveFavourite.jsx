import { collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const RemoveFavourite = ({ userID, faveID, setDeletedFave }) => {
  // firestore database reference that we want to access and the document we want to delete (if the button is pressed)
  const faveRef = doc(collection(db, "favourites", userID, "species"), faveID);

  //when the remove faveourite button is clicked this function runs and the document is deleted from the firestore database
  function handleRemove() {
    deleteDoc(faveRef).then(() => {
      console.log("Removed from favourites");
      //this is so the favourites list component is re-rendered and the list updates for the client.
      setDeletedFave(true);
    });
  }

  return (
    <div className="removeButtonContainer">
      <button
        className="removeButton"
        onClick={() => {
          handleRemove();
        }}
      >
        Remove Favourite!
      </button>
    </div>
  );
};

export default RemoveFavourite;
