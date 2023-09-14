const SignOut = ({ authUser, userSignOut }) => {
  return (
    <div className="signOutContainer">
      <p>{`Signed In as ${authUser.email}`}</p>
      <button onClick={userSignOut}>Sign Out</button>
    </div>
  );
};

export default SignOut;
