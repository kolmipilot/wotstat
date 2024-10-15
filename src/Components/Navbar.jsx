import { useState } from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-xl font-bold"><Link to="/">WOTstats</Link></div>

        {/* Przycisk do otwierania menu na mobilnych urządzeniach */}
        <button
          onClick={toggleMenu}
          className="text-white block md:hidden focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
            />
          </svg>
        </button>

        {/* Menu nawigacyjne */}
        <ul
          className={`${
            isOpen ? 'block' : 'hidden'
          } md:flex md:items-center md:space-x-6 text-white`}
        >
          <li>
            <Link to="/" className="block md:inline-block py-2">
              Główna
            </Link>
          </li>
          <li>
            <Link to="/onas" className="block md:inline-block py-2">
              O nas
            </Link>
          </li>
          <li>
            <a href="#" className="block md:inline-block py-2">
              Kontakt
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
