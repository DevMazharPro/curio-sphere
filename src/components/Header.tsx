import Image from "next/image";
import { Button } from "./button";
import { useTheme } from "next-themes";
import { ModeToggle } from "./toogleMood";
import { BookHeart, Headset, House } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <nav className="flex justify-between items-center p-4 border-b">
      <Link href="/">
        <div className="uppercase text-xl font-bold">
          Curio<span className="text-buttonColor">Sphere</span>
        </div>
      </Link>
      <div>
        <ul className="flex space-x-4">
          <Link href={"/"}>
            {" "}
            <li className="flex items-center gap-4 hover:text-buttonColor">
              <House />
              Home
            </li>
          </Link>
          <Link href={"/about"}>
            <li className="flex items-center gap-4 hover:text-buttonColor">
              <BookHeart />
              About
            </li>
          </Link>
          <Link href={"/contact"}>
            <li className="flex items-center gap-2 hover:text-buttonColor">
              <Headset />
              Contact Us
            </li>
          </Link>
        </ul>
      </div>
      <div>
        <ModeToggle />
      </div>
    </nav>
  );
}
