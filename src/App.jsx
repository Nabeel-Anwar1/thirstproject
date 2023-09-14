import "./App.css";
import SignIn from "./components/SignIn";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import SignUp from "./components/SignUp";
import ItemList from "./components/ItemList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FavouritePage from "./components/FavouritePage";

function App() {
  // useState to track and see if user is logged in or not, default null
  const [authUser, setAuthUser] = useState(null);
  const [addFave, setAddFave] = useState(false);
  //runs once when component loads, gets user object if it exists
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    //remove listener once component unmounts
    return () => {
      listen();
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        {/*if authUser is not null then show user signed in, else show sign in component*/}
        {authUser ? (
          <Routes>
            <Route
              path="/"
              element={<ItemList authUser={authUser} setAddFave={setAddFave} />}
            />
            <Route
              path="/profile"
              element={
                <FavouritePage
                  authUser={authUser}
                  setAddFave={setAddFave}
                  addFave={addFave}
                />
              }
            />
          </Routes>
        ) : (
          <div>
            <Routes>
              <Route path="/" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </div>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
