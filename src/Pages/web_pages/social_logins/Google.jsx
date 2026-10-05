import { useNavigate } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { useEffect, useState } from "react";


function Google() {

  // Google_Key----------------------------------------------------------------------
  const googleAppId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  // React_States --------------------------------------------------------------------
  const navigate = useNavigate();
  const [GoogleSdkLoaded, setGoogleSdkLoaded] = useState();

  // Functions -----------------------------------------------------------------------

  // Google-Response
  const responseGoogle = () => {
    navigate('/')
  };

  // Google-UseEffects
  useEffect(() => {
    // Load the Google SDK script asynchronously
    const googleScript = document.createElement("script");
    googleScript.src = "https://apis.google.com/js/platform.js";
    googleScript.async = true;
    googleScript.onload = () => {
      // Set the state to indicate that the Google SDK has loaded
      setGoogleSdkLoaded(true);
    };
    document.body.appendChild(googleScript);

    // Clean up the Google script tag when the component unmounts
    return () => {
      document.body.removeChild(googleScript);
    };
  }, []);

  return (
    <div>
      <div className="mt-3">
        {GoogleSdkLoaded && googleAppId ? (
          <GoogleLogin
            clientId={googleAppId}
            buttonText="Login with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
            redirectUri="http://localhost:3000/"
          />
        ) : (
          <p>
            {GoogleSdkLoaded
              ? "Google login is not configured."
              : "Loading Google Sdk..."}
          </p>
        )}
      </div>
    </div>
  );
}

export default Google;
