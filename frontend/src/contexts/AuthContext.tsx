import { createContext, useState, useEffect } from "react";
import api from "../api/axios";
import { useGoogleLogin } from "@react-oauth/google";
export const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const idToken = localStorage.getItem("idToken");
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user)
    if (idToken) {
      api
        .get("/auth/google", {
          headers: {
            Authorization: `Bearer ${idToken}`,
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
        // const userInfoResponse = await fetch(
        //   "https://www.googleapis.com/oauth2/v3/userinfo",
        //   {
        //     headers: {
        //       Authorization: `Bearer ${tokenResponse.access_token}`,
        //     },
        //   }
        // );
        // const userInfo = await userInfoResponse.json();

        // console.log("Google User Info:", userInfo); // Debugging

        // Send user's info to the backend for verification
        console.log(tokenResponse)
        // const { data } = await api.post("/auth/google/token", {
        //   token: tokenResponse.id_token,
        // });

        // localStorage.setItem("token", data.token);
        // localStorage.setItem("user", JSON.stringify(data.user));
        // console.log("User logged in: ", data.user);
        // console.log(data.token)
      } catch (error) {
        console.error("Google login failed", error);
      }
    },
    onError: (error) => {
      console.error("Google Login Error:", error);
    },
    flow: 'auth-code',
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
