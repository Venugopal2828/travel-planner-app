import React from "react";
import FacebookLogin from "react-facebook-login";
import axios from "axios";

function FacebookSignUp() {
    const responseFacebook = async (response) => {
        if (response.accessToken) {
            try {
                const res = await axios.post("http://localhost:8080/api/auth/facebook", {
                    token: response.accessToken,
                });
                console.log("Facebook login success:", res.data);
            } catch (error) {
                console.error("Error during Facebook Login:", error.response?.data || error.message);
            }
        } else {
            console.error("Facebook Login Failed");
        }
    };

    return (
        <div>
            <h3>Sign Up with Facebook</h3>
            <FacebookLogin
                appId="YOUR_FACEBOOK_APP_ID"
                autoLoad={false}
                fields="name,email,picture"
                callback={responseFacebook}
            />
        </div>
    );
}

export default FacebookSignUp;
