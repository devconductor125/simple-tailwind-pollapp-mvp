import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import isEmpty from "../components/utils/isEmpty";
import axios from "axios";
import { useRouter } from "next/router";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const router = useRouter();

  const registerHandler = () => {
    if (
      isEmpty(name) ||
      isEmpty(email) ||
      isEmpty(password) ||
      isEmpty(confirm) ||
      password != confirm
    ) {
      console.log("error");
      return;
    } else {
      axios
        .post("http://localhost:3000/api/users/signup", {
          name,
          email,
          password,
        })
        .then((res) => {
          if (res.data.msg == "success") {
            router.push("/");
          } else {
            alert(res.data.msg);
          }
        });
    }
  };
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden px-4">
      <div className="w-full p-6 bg-white rounded-md shadow-xl drop-shadow-2xl md:max-w-xl">
        <h1 className="text-3xl font-bold text-center flex justify-center text-gray-700">
          <Image
            width={100}
            height={100}
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
            alt="Your Company"
          />
        </h1>
        <div className="mt-6">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-800"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="confirm"
              className="block text-sm font-semibold text-gray-800"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm"
              value={confirm}
              onChange={(event) => {
                setConfirm(event.target.value);
              }}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div className="mt-6">
            <button
              onClick={registerHandler}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-gray-600"
            >
              Signup
            </button>
          </div>
        </div>

        <p className="mt-4 text-sm text-center text-gray-700">
          If you have an account?{" "}
          <Link href="/" className="font-medium text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
