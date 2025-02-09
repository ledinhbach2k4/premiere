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
        const { data } = await api.post("/auth/google/token", {
          token: tokenResponse.access_token,
        });
        localStorage.setItem("token", data.token);
        console.log("User logged in: ", data.user);
      } catch (error) {
        console.error("Google login failed", error);
      }
    },
    onError: (error) => {
      console.error(error);
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
