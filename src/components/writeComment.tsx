"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
export const revalidate = 5;


const WriteComment = ({
  _id,
}: {
  _id: string;
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
    <form onSubmit={handleSubmit} className="mt-6">
      <h2 className="text-xl font-bold text-primaryColor">Leave a Comment:</h2>

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
          value={name}
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 block w-full"
        />
      </div>

      <div className="mt-4">
        <label
          htmlFor="comment"
          className="block text-sm font-medium text-gray-700"
        >Comment Here</label>
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
          Comment
        </button>
      </div>
    </form>
  );
};

export default WriteComment;
