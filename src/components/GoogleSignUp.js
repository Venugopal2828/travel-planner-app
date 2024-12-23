import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";

function GoogleSignUp() {
    const handleGoogleSuccess = async (credentialResponse) => {
        const token = credentialResponse.credential;

        try {
            const response = await axios.post("http://localhost:8080/api/auth/google", { token });
            console.log("Google login success:", response.data);
        } catch (error) {
            console.error("Error during Google Login:", error.response?.data || error.message);
        }
    };

    const handleGoogleFailure = () => {
        console.log("Google Login Failed");
    };

    return (
        <GoogleOAuthProvider clientId="1030368328414-e3kd4umrp7148tstotg65uaukagjca78.apps.googleusercontent.com">
            <div>
                <h3>Sign Up with Google</h3>
                <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleFailure}
                />
            </div>
        </GoogleOAuthProvider>
    );
}

export default GoogleSignUp;
