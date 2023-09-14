import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const SignOut = ({ authUser }) => {
  const navigate = useNavigate();
  //sign out button and functionality using firebase
  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="signOutContainer">
      <p>{`Signed In as ${authUser.email}`}</p>
      <button onClick={userSignOut}>Sign Out</button>
    </div>
  );
};

export default SignOut;
