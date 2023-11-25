import { motion } from "framer-motion";
import { BsHeartArrow } from "react-icons/bs";
import { Link } from "react-router-dom";

function About() {
  const containerVariants = {
    hidden: { opacity: 0, x: "100vw" },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 20 },
    },
  };

  const containerVariants2 = {
    hidden: { opacity: 0, x: "-100vw" },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 20 },
    },
  };

  return (
    <div
      name="about"
      className="h-screen w-full bg-gradient-to-b from-black via-black to-gray-800"
    >
      <div className=" max-w-screen-lg mx-auto flex flex-col items-center justify-center h-full px-4 md:flex-row">
        <motion.div
          className="popup-container"
          variants={containerVariants2}
          initial="hidden"
          animate="visible"
        >
          <div className="flex flex-col justify-center h-full">
            <h2 className="text-4xl sm:text-7xl font-bold  text-white font-GV">
              Peer Pulse
            </h2>
            <p className="text-gray-500 py-4 max-w-md font-Raleway">
              Step into a world of boundless knowledge and collaborative
              excellence. Welcome to our innovative study rooms, where students
              connect, share ideas, and elevate their learning experience
              through seamless chat, engaging video calls, and a myriad of
              interactive tools. Elevate your study sessions with us where the
              future of learning unfolds.
            </p>

            <Link to="/login" smooth duration={500}>
              <button className="group text-white w-fit px-6 py-3 my-2 flex items-center rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer ">
                Get Started
                <span className="group-hover:rotate-90 duration-300 ">
                  <BsHeartArrow size={25} className="ml-1" />
                </span>
              </button>
            </Link>
          </div>
        </motion.div>

        <div>
          <motion.div
            className="popup-container"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <img
              src="/NowOpen (1)-PhotoRoom.png-PhotoRoom.png"
              alt="PeerPulse"
              className="rounded-2xl mx-auto w-2/3 md:w-full h-2/3 md:h-96 ml-14"
            ></img>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default About;
