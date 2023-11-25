import { motion } from "framer-motion";

function Features() {
  const containerVariants = {
    hidden: { opacity: 0, x: "-100vw" }, 
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 20 },
    },
  };

  const features = [
    {
      id: 1,
      src: "/Video Calling.png",
      title: "Video Calling",
      style: " shadow-blue-500",
    },
    {
      id: 2,
      src: "/Chatting.png",
      title: "Real Time Chatting",
      style: " shadow-yellow-500",
    },
    {
      id: 3,
      src: "/Chat GPT.jpg",
      title: "Chat GPT Assistance",
      style: " shadow-green-500",
    },
    {
      id: 4,
      src: "/Stripe.png",
      title: "Online Payment",
      style: " shadow-purple-500",
    },
    {
      id: 5,
      src: "/Email.png",
      title: "Emailing System",
      style: " shadow-red-500",
    },
    {
      id: 6,
      src: "/UserFriendly.png",
      title: "User Friendly",
      style: " shadow-white",
    },
  ];
  return (
    <div
      name="features"
      className=" bg-gradient-to-b from-gray-800 to-black w-full h-screen"
    >
      <div className=" max-w-screen-lg mx-auto p-4 flex flex-col justify-center w-full h-full text-white">
        <motion.div
          className="popup-container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div>
            <p className="text-4xl font-bold border-b-4 border-gray-500 inline p-2">
              Features
            </p>
          </div>
        </motion.div>

        <div className=" w-full grid grid-cols-2 sm:grid-cols-3 gap-8 text-center py-8 px-12 sm:px-0">
          
            {features.map(({ id, src, title, style }) => (
              <div
                key={id}
                className={` shadow-md hover:scale-105 duration-500 py-2 rounded-lg ${style}`}
              >
                <img
                  className=" w-28 h-24 mx-auto mt-3"
                  src={src}
                  alt="VideoCalling"
                ></img>
                <p className="mt-4 text-white">{title}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Features;
