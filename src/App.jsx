import "./App.css";
import SignIn from "./components/SignIn";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./firebase";

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

  return (
    <>
      <div>
        {/*if authUser is not null then show user signed in, else show sign in component*/}
        {authUser ? (
          <>
            <p>{`Signed In as ${authUser.email}`}</p>
          </>
        ) : (
          <div>
            <SignIn />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
