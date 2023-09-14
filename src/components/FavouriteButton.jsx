

const FavouriteButton = () => {

  function addFave() {
    const newFave = {
      speciesID,
      speciesName,
    };
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
