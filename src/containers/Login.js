import React from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, GoogleLogout } from "react-google-login";

const Login = ({ setProfile, profile, clientId }) => {
  const navigate = useNavigate();

  const onSuccess = (res) => {
    setProfile(res.profileObj);
    navigate("/");
  };

  const onFailure = (err) => {
    console.log("failed", err);
  };

  const logOut = () => {
    setProfile(null);
    navigate("/");
  };

  return (
    <div className="login-container">
      <h2>Login in and out with Google</h2>
      <br />
      <br />
      {profile ? (
        <div>
          <img src={profile.imageUrl} alt="user" />
          <h3>User Logged in</h3>
          <p>Name: {profile.name}</p>
          <p>Email Address: {profile.email}</p>
          <br />
          <br />
          <GoogleLogout
            clientId={clientId}
            buttonText="Log out"
            onLogoutSuccess={logOut}
          />
        </div>
      ) : (
        <GoogleLogin
          className="login"
          clientId={clientId}
          buttonText="Sign in with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
        />
      )}
    </div>
  );
};

export default Login;
