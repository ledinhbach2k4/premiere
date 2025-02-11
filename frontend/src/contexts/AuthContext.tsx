import { createContext, useState, useEffect } from "react";
import api from "../api/axios";
import { useGoogleLogin } from "@react-oauth/google"; // Import a Google login hook

export const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token) {
      api
        .get("/auth/google", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => setUser(res.data.user))
        .catch(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);
  const googleLogin = useGoogleLogin({
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
        localStorage.setItem("user", data.user);
        console.log("User logged in: ", data.user);
      } catch (error) {
        console.error("Google login failed", error);
      }
    },
    onError: (error) => {
      console.error("Google Login Error:", error);
    },
  });
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        login: googleLogin,
        logout,
        loading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
