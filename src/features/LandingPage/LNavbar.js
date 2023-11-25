import { useState } from "react";
import { FaBars, FaTimes, FaRegMoon } from "react-icons/fa";
import { MdOutlineWbSunny } from "react-icons/md";
import { Link } from "react-scroll";

function LNavbar() {
  const [nav, setNav] = useState(false);
  const [mode, setMode] = useState(false);
  const links = [
    {
      id: 1,
      link: "about",
    },
    {
      id: 2,
      link: "features",
    },
    {
      id: 3,
      link: "contributors",
    },
    {
      id: 4,
      link: "contact",
    },
  ];
  return (
    <div className="flex px-4 justify-between items-center w-full h-20 text-white bg-black fixed">
      <div>
        <h1 className=" text-4xl ml-2 font-GV hover:scale-105 duration-200">
          PeerPulse
        </h1>
      </div>

      <ul className=" hidden md:flex">
        {links.map(({ id, link }) => (
          <li
            key={id}
            className="px-4 cursor-pointer font-Raleway capitalize font-medium text-gray-500 hover:text-white hover:scale-105 duration-200"
          >
            <Link to={link} smooth duration={500}>{link}</Link>
          </li>
        ))}
        <li className=" cursor-pointer hover:scale-105 duration-200" onClick={()=> setMode(!mode)}>{mode ? <FaRegMoon size={20} /> : <MdOutlineWbSunny size={20} />}</li>
      </ul>

      <div
        onClick={() => setNav(!nav)}
        className=" cursor-pointer pr-4 z-10 text-gray-500 md:hidden "
      >
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {nav && (
        <ul className=" flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-white font-Raleway">
          {links.map(({ id, link }) => (
            <li
              key={id}
              className="px-4 cursor-pointer capitalize py-6 text-4xl"
            >
              {link}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LNavbar;
