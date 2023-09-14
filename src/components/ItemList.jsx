import { useQuery, gql } from "@apollo/client";

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

const ItemList = () => {
  // loading and error functionality built in with apollo
  const { loading, error, data } = useQuery(SWAPI_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  // on data return, map through data and return a list of items containing the id as the key and the name
  return (
    <div>
      <h2>Star Wars Species List</h2>
      <ul>
        {data.allSpecies.species.map((species) => (
          <li key={species.id}>{species.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
