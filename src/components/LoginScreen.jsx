import React from "react";
const backendURI = import.meta.env.VITE_BACKEND_URI;
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
const LoginScreen = ({ setLogin }) => {
  return (
    <main className='min-h-scree flex flex-col gap-4 items-center p-3'>
      <h1 className='text-5xl text-center'>Please Login</h1>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          const decoded = jwtDecode(credentialResponse.credential);
          // console.log(decoded);
          setLogin(decoded);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </main>
  );
};

export default LoginScreen;
