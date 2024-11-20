import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = "http://localhost:8080/auth/login";
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    
    if (data.success && data.token && data.email) {
        dispatch(setUser({email: data.email, token: data.token}))
        navigate("/");
    }
  };

  return (
    <div className="flex flex-col items-center mt-60 h-[400px] w-[500px] mx-auto  p-2 rounded-md">
      <div className="flex flex-col items-center mb-10 mt-10">
        <h1 className="text-2xl md:text-3xl font-bold ">Login</h1>
        <span>
          Don't have an Account? <Link to="/register" className="underline">Register</Link>
        </span>
      </div>

      <form
        action=""
        className="flex flex-col gap-4 w-full"
        onSubmit={handleSubmit}
      >
        <div className="w-full flex flex-col">
          <h1 className="text-md font-semibold pl-1 mb-1">Email</h1>
          <div className="border border-gray-300 rounded-md p-2 w-full bg-white">
            <input
              type="text"
              placeholder="max.müller@gmail.com"
              className="w-full outline-none"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
        </div>

        <div>
          <h1 className="text-md font-semibold pl-1 mb-1">Password</h1>
          <div className="border border-gray-300 rounded-md p-2 bg-white">
            <input
              type="password"
              placeholder="Passwort eingeben"
              className="w-full outline-none"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
        </div>

        <button className="bg-black text-white p-2 rounded-md" type="submit">
          Login
        </button>

        <div></div>
      </form>
    </div>
  );
};

export default Login;
