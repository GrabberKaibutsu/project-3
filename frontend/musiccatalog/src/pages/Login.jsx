import React from "react";
import { useState, useEffect } from "react";

const Login = (props) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3001/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json(); // Parse the response to use in both success and error cases

      if (!response.ok) {
        console.error("Login failed:", data); // Use 'data' to log the error
        alert("Login failed: " + (data.message || "Unknown error")); // Provide a fallback message
        return;
      }

      props.setUser(data.user); // Set user state
      console.log("User set in login:", data.user); // Check if this logs correctly
      localStorage.setItem("user", JSON.stringify(data.user)); // Persist the login token
    } catch (error) {
      console.error("Network error:", error); // Log network or parsing errors
      alert("Network error: " + error.message); // Show a user-friendly error message
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900"
      id="main-content"
    >
      <section className="p-8 bg-white dark:bg-gray-700 rounded-lg shadow-md">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
          alt="Your Company"
        />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          className="space-y-4"
        >
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-600 dark:text-white"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-600 dark:text-white"
          />
          <input
            type="submit"
            value="Log In"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600 dark:hover:bg-blue-700"
          />
          <div className="text-sm">
            <a
              href="#"
              className="font-semibold text-indigo-400 hover:text-indigo-300"
            >
              Forgot password?
            </a>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Login;
