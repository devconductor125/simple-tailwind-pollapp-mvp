import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onLogin = async () => {
    const response = await axios.post("http://localhost:3000/api/users/login", {
      email,
      password,
    });
    if (response.status == 200) {
      if (response.data[0].role === "admin") {
        localStorage.setItem("user_info", JSON.stringify(response.data[0]));
        router.push("/admin/dashboard");
      } else {
        localStorage.setItem("user_info", JSON.stringify(response.data[0]));
        router.push("/user");
      }
    } else {
      setError(response.data.msg);
    }
  };
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden px-4">
      <div className="w-full p-6 bg-white rounded-md shadow-xl drop-shadow-2xl md:max-w-xl ">
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
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              onChange={(e) => {
                setEmail(e.target.value);
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
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          {/* <Link
            href="/forget"
            className="text-xs text-blue-600 hover:underline"
          >
            Forget Password?
          </Link> */}
          {error && (
            <div className="mt-4 flex justify-center items-center text-[#ef4444]">
              {error}
            </div>
          )}
          <div className="mt-6">
            <button
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-gray-600"
              onClick={onLogin}
            >
              Login
            </button>
          </div>
        </div>

        <p className="mt-4 text-sm text-center text-gray-700">
          Don`&lsquo;`t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-blue-600 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
