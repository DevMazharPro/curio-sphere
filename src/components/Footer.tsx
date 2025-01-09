import { Github, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-primaryColor dark:bg-primaryColor/10 text-white dark:text-gray-200 mt-4">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          <div className="flex flex-col md:w-1/3 mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-4">CurioSphere</h2>
            <p className="text-sm mb-4">
              Welcome to CurioSphere—where curiosity meets knowledge! Me Mazhar
              Hussain, the mind behind this platform, dedicated to exploring
              science, technology, history, and more. Our mission is to deliver
              engaging, well-researched content that sparks curiosity and
              inspires discovery. Join us on this journey—one article at a time!
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://www.instagram.com/iammazhr"
                className="text-white dark:text-gray-300 hover:text-buttonColor dark:hover:text-buttonColor"
              >
                <Instagram size={20} />
              </Link>
              <Link
                href="https://www.linkedin.com/in/mazhar-hussain-979412252"
                className="text-white  dark:text-gray-300 hover:text-buttonColor dark:hover:text-buttonColor"
              >
                <Linkedin size={20} />
              </Link>
              <Link
                href="https://github.com/DevMazharPro"
                className="text-white  dark:text-gray-300 hover:text-buttonColor dark:hover:text-buttonColor"
              >
                <Github size={20} />
              </Link>
            </div>
          </div>
          <div className="flex flex-col md:w-1/3 mx-2 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul>
              <li className="mb-2">
                <Link
                  href="/"
                  className="text-white dark:text-gray-300 hover:text-buttonColor dark:hover:text-buttonColor"
                >
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="/about"
                  className="text-white dark:text-gray-300 hover:text-buttonColor dark:hover:text-buttonColor"
                >
                  About
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="/contact"
                  className="text-white dark:text-gray-300 hover:text-buttonColor dark:hover:text-buttonColor"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col md:w-1/3">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="mb-2">Hyderabad, Sindh, Pakistan</p>
            <p className="mb-4">Email: ibrarhalepotooo@gmail.com</p>
            <p>Phone: (+92) 03048420046</p>
          </div>
        </div>
        <div className="border-t border-gray-300 dark:border-gray-700 mt-8 pt-4 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Curiosphere. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
