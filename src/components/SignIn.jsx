import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault(); //so page does not get reloaded on submit
    if (!email) {
      return alert("Email cannot be empty");
    }
    if (!password) {
      return alert("Password cannot be empty");
    }
    //done some error handling, simple errors from user
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setEmail("");
        setPassword("");
      }) // firebase has some built in features like this sign in, after its complete i change the email and password fields to empty strings
      .catch((err) => {
        if (
          err.code === "auth/user-not-found" ||
          err.code === "auth/wrong-password"
        ) {
          setEmail("");
          setPassword("");
          return alert("Email or Password incorrect");
        } else if (err.code === "auth/email-already-in-use") {
          return alert("An account with this email already exists");
        } else {
          return alert("There was a problem with your request");
        } // some more error handling for when the email or password is incorrect or other misc errors.
      });
  };

  //creating a form to login
  return (
    <div className="signInContainer">
      <form onSubmit={signIn}>
        {" "}
        {/*goes to function above on submit*/}
        <h1>Log In to your Account</h1>
        <label>
          <input
            name="username"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} //on change here so when user is typing you can see what is happeneing.
          ></input>
        </label>
        <label>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </label>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default SignIn;

// users able to sign up or log in now