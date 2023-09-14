import "./App.css";
import SignIn from "./components/SignIn";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import SignUp from "./components/SignUp";
import ItemList from "./components/ItemList";

function App() {
  // useState to track and see if user is logged in or not, default null
  const [authUser, setAuthUser] = useState(null);
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

  //sign out button and functionality using firebase
  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="App">
        {/*if authUser is not null then show user signed in, else show sign in component*/}
        {authUser ? (
          <>
            <ItemList  />
            <p>{`Signed In as ${authUser.email}`}</p>
            <button onClick={userSignOut}>Sign Out</button>
          </>
        ) : (
          <div>
            <SignIn />
            <SignUp />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
