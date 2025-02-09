import React, { useContext } from "react";
import GoogleIcon from "@mui/icons-material/Google"; // Import a Google icon
import { Button } from "@mui/material"; // Import a button
import { useGoogleLogin } from "@react-oauth/google"; // Import a Google login hook
import api from "../api/axios";
import { AuthContext } from "../contexts/AuthContext";
export default function LoginButton() {
  const { login } = useContext(AuthContext);

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Fetch user info from Google using the access token
        const userInfoResponse = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );
        const userInfo = await userInfoResponse.json();

        console.log("Google User Info:", userInfo); // Debugging

        // Send user's info to the backend for verification
        const { data } = await api.post("/auth/google/token", {
          googleId: userInfo.sub, // Google User ID
          email: userInfo.email,
          name: userInfo.name,
        });

        localStorage.setItem("token", data.token);
        console.log("User logged in: ", data.user);
        
      } catch (error) {
        console.error("Google login failed", error);
      }
    },
    onError: (error) => {
      console.error("Google Login Error:", error);
    },
  });
  return (
    <Button
      variant="contained"
      startIcon={<GoogleIcon />}
      onClick={() => {
        handleGoogleLogin();
      }}
    >
      Login with Google
    </Button>
  );
}
