import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import RemoveFavourite from "./RemoveFavourite";
import SignOut from "./SignOut";
import { Link } from "react-router-dom";

//passed in from parent component as they are used in other children components
const FavouritePage = ({ authUser, setAddFave, addFave }) => {
  //favourite list set as empty array here, will update the list after getting the doc
  const [faves, setFaves] = useState([]);
  const [loading, isLoading] = useState(false);
  //
  const [deletedFave, setDeletedFave] = useState(false);
  //firestore database reference that we want to access
  const faveRef = collection(db, "favourites", authUser.uid, "species");

  useEffect(() => {
    setDeletedFave(false);
    //start off by setting setAddFave to false so we can always update when the value changes
    setAddFave(false);
    isLoading(true);
    //initialise empty array where the data from the getDocs will be pushed into
    const faveList = [];
    getDocs(faveRef).then((faveItems) => {
      //promise resolve then take the array of data and forEach array index take the item and push the data and id into the faveList array
      faveItems.forEach((faveItem) => {
        faveList.push({ data: faveItem.data(), id: faveItem.id });
      });
      //set the faves state to what we now have in the faveList array
      setFaves(faveList);
      isLoading(false);
    });
  }, [deletedFave, addFave]); //addFave and deletedFave are dependencies, the useEffect will re-run whenever this value changes (when someone clicks the favourite button or remove button)

  return (
    <div>
      {/*ternary operator used, if loading is true display loading h2, if false then show list*/}
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <h1>Favourites</h1>
          <ul className="favouritesList">
            {faves.map((faveSpecies) => {
              return (
                <li key={faveSpecies.data.speciesID}>
                  {faveSpecies.data.speciesName}
                  <RemoveFavourite
                    userID={authUser.uid}
                    faveID={faveSpecies.id}
                    setDeletedFave={setDeletedFave}
                  />
                </li>
              );
            })}
          </ul>
        </>
      )}
      <Link to="/">Go Back!</Link>
      <SignOut authUser={authUser} />
    </div>
  );
};

export default FavouritePage;
