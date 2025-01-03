import Image from "next/image";
import React from "react";

export default function About() {
  return (
    <div>
      <div className="w-full p-8 space-y-6">
        <h1 className="text-3xl font-bold">About Us?</h1>
        <p className="text-xl">
          Welcome to{" "}
          <span className="font-bold text-buttonColor">CurioSphere</span>, a
          space where curiosity meets knowledge! I'm{" "}
          <span className="font-bold text-buttonColor">Mazhar Hussain</span>,
          the mind behind this platform, dedicated to exploring fascinating
          topics across science, technology, history, and beyond. At
          CurioSphere, we believe that learning never stops, and every question
          has a story worth uncovering. Our mission is to bring well-researched,
          engaging, and insightful content that sparks curiosity and inspires
          discovery. Join us on this journey of exploration and expand your
          horizons—one article at a time!
        </p>
      </div>
    </div>
  );
}
