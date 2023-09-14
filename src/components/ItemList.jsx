import { useQuery, gql } from "@apollo/client";
import { useState } from "react";
import FavouriteButton from "./FavouriteButton";
import FavouritePage from "./FavouritePage";
import SignOut from "./SignOut";

//uses apollos graphql functionality to create a query that we can use to access the data we want to see from the graphql database
const SWAPI_QUERY = gql`
  query GetSpecies {
    allSpecies {
      species {
        id
        name
      }
    }
  }
`;

const ItemList = ({ authUser, userSignOut }) => {
  const [addFave, setAddFave] = useState(false);

  // loading and error functionality built in with apollo
  const { loading, error, data } = useQuery(SWAPI_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  // on data return, map through data and return a list of items containing the id as the key and the name
  return (
    <div className="itemListContainer">
      <h2>Star Wars Species List</h2>
      <ul className="itemList">
        {data.allSpecies.species.map((species) => (
          <li key={species.id}>
            {species.name}
            <FavouriteButton
              userID={authUser.uid}
              speciesName={species.name}
              speciesID={species.id}
              setAddFave={setAddFave}
            />
          </li>
        ))}
      </ul>
      <FavouritePage
        userID={authUser.uid}
        setAddFave={setAddFave}
        addFave={addFave}
      />
      <SignOut authUser={authUser} userSignOut={userSignOut} />
    </div>
  );
};

export default ItemList;
