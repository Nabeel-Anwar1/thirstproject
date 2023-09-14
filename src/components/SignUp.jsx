import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = (e) => {
    e.preventDefault();
    //using firebase functionality to send auth, email and password to make an account
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        setEmail("");
        setPassword("");
        //after the pronmise resolves we set the input boxes back to empty strings
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="signUpContainer">
      <form onSubmit={signUp}>
        <h1>Create Account</h1>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;

// also automatically signs you in after you create an account and shows user logged in