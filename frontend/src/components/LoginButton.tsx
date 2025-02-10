import { useContext } from "react";
import GoogleIcon from "@mui/icons-material/Google"; // Import a Google icon
import { Button } from "@mui/material"; // Import a button
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginButton() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <Button
      variant="contained"
      startIcon={<GoogleIcon />}
      onClick={() => {
        login();
        navigate("/");
      }}
    >
      Login with Google
    </Button>
  );
}
