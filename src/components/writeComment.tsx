"use client";

import React, { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { loginWithGoogle, logout } from "@/app/firebase";

export const revalidate = 5;

const WriteComment = ({ _id }: { _id: string }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [user, setUser] = useState<any>(null); // To track the logged-in user

  // Check for a logged-in user when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setName(parsedUser.displayName || ""); // Set the user's display name if available
      setEmail(parsedUser.email || ""); // Set the user's email if available
    }
  }, []);

  const handleLogin = async () => {
    const loggedInUser = await loginWithGoogle();
    if (loggedInUser) {
      setUser(loggedInUser);
      setName(loggedInUser.displayName || ""); // Fetch name from the Google account
      setEmail(loggedInUser.email || ""); // Fetch email from the Google account
      localStorage.setItem("user", JSON.stringify(loggedInUser));
    }
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    setName("");
    setEmail("");
    localStorage.removeItem("user");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      alert("You must log in with Google to comment.");
      return;
    }

    const res = await fetch("/api/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, comment, _id }),
    });

    const data = await res.json();
    console.log(data.message); // Comment submission successful
    if (res.ok) {
      window.location.reload(); // Force a full page reload
    }

    // Clear the form
    setName("");
    setEmail("");
    setComment("");
  };

  return (
    <div className="mt-8">
      {!user ? (
        <div>
          <p className="text-sm text-gray-700 mb-4">
            To leave a comment, you must sign in with your Google account. This
            helps ensure that all comments are linked to a verified user.
          </p>
          <button
            onClick={handleLogin}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primaryColor hover:bg-primaryColor-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryColor"
          >
            Login with Google
          </button>
        </div>
      ) : (
        <div>
          <button
            onClick={handleLogout}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryColor"
          >
            Logout
          </button>

          <form onSubmit={handleSubmit} className="mt-6">
            <h2 className="text-xl font-bold text-primaryColor">
              Leave a Comment:
            </h2>

            <div className="mt-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <Input
                id="name"
                type="text"
                value={name} // Name is now automatically filled from Google
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 block w-full"
              />
            </div>

            <div className="mt-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email} // Email is now automatically filled from Google
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full"
              />
            </div>

            <div className="mt-4">
              <label
                htmlFor="comment"
                className="block text-sm font-medium text-gray-700"
              >
                Comment Here
              </label>
              <Textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                className="mt-1 block w-full"
              />
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primaryColor hover:bg-primaryColor-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryColor"
              >
                Post Comment
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default WriteComment;
