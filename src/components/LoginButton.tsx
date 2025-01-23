import React from "react";
import GoogleIcon from "@mui/icons-material/Google"; // Import a Google icon
import { Button } from "@mui/material"; // Import a button
import { useGoogleLogin } from "@react-oauth/google"; // Import a Google login hook
import api from "../api/axios";
export default function LoginButton() {
  const login = useGoogleLogin({
    onSuccess: async (res) => {
      const { data } = await api.get(
   
          // send to backend
      );
      // data will be the token
      // store the token in local storage
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
        login();
      }}
    >
      Login with Google
    </Button>
  );
}
