import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../components/UserContext";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] =useState(false)

  const {setUser} = useContext(UserContext)

  async function handleLoginSubmit(e) {
    e.preventDefault();
    try {
     const response =  await axios
      .post("/api/auth/login", {
        email,
        password
      });
      setUser(response.data)
      alert("Login successful");
      setRedirect(true)
    } catch (error) {
      console.log(error);
      alert("Login failed");
    }
  }

  if(redirect) {
    return <Navigate to={'/'}/>
  }
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto " onSubmit={handleLoginSubmit}>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?{" "}
            <Link to="/register" className="underline font-bold text-black">
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
