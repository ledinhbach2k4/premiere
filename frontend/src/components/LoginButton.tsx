import { useContext } from "react";
import GoogleIcon from "@mui/icons-material/Google"; // Import a Google icon
import { Button } from "@mui/material"; // Import a button
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import api from "../api/axios";

export default function LoginButton() {
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const handleSuccess = async (tokenResponse) => {
    const { credential } = tokenResponse;
    // const decodedToken = jwtDecode(credential);
    const res = await api.post('/auth/google/token', {
      token: credential,
    })
    const token = res.data.token

    localStorage.setItem("token", token);
  }

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => {
        console.log("Login Failed");
      }}
    />
  );
}
