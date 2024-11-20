import React, { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = "http://localhost:8080/auth/register";
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstname, lastname, email, password }),
    });
    const data = await res.json();
    if (data.success) {
      alert("Thanks for creating an account by us!, please log in :)");
      navigate("/login");
    }
  };

  return (
    <div className="flex flex-col items-center mt-60 h-[400px] w-[500px] mx-auto  p-2 rounded-md">
      <div className="flex flex-col items-center mb-10 mt-10">
        <h1 className="text-2xl md:text-3xl font-bold ">Register</h1>
        <span>
          Already have an Account?{" "}
          <Link to="/login" className="underline">
            Login
          </Link>
        </span>
      </div>
      <form
        action=""
        className="flex flex-col gap-4 w-full"
        onSubmit={handleSubmit}
      >
        <div className="w-full flex flex-col">
          <h1 className="text-md font-semibold pl-1 mb-1">First Name</h1>
          <div className="border border-gray-300 rounded-md p-2 w-full bg-white">
            <input
              type="text"
              placeholder="Max"
              className="w-full outline-none"
              value={firstname}
              onChange={(e) => {
                setFirstname(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="w-full flex flex-col">
          <h1 className="text-md font-semibold pl-1 mb-1">Last Name</h1>
          <div className="border border-gray-300 rounded-md p-2 w-full bg-white">
            <input
              type="text"
              placeholder="Müller"
              className="w-full outline-none"
              value={lastname}
              onChange={(e) => {
                setLastname(e.target.value);
              }}
            />
          </div>
        </div>

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
          Register
        </button>

        <div></div>
      </form>
    </div>
  );
};

export default Register;
