function Contacts() {
  return (
    <div
      name="contact"
      className="w-full h-full bg-gradient-to-b from-gray-800 to-black p-4 text-white"
    >
      <div className="flex flex-col p-4 justify-center max-w-screen-lg mx-auto h-full">
        <div className="pb-8">
          <p className="text-4xl font-bold inline border-b-4 border-gray-500">
            Contacts
          </p>
          <p className=" py-6 capitalize">
            Submit the form below to get in touch with us
          </p>
        </div>

        <div className="flex justify-center items-center">
          <form action="https://getform.io/f/db278ddc-d55d-4850-9154-dfae59984c65" method="POST" className="flex flex-col w-full md:w-1/2">
            <input
              type="text"
              name="name"
              placeholder="Enter Your Name"
              className="p-2 bg-transparent border-2 rounded-md text-white focus:outline-none"
            />
            <input
              type="text"
              name="email"
              placeholder="Enter Your Email"
              className=" my-4 p-2 bg-transparent border-2 rounded-md text-white focus:outline-none"
            />
            <textarea
              name="message"
              placeholder="Enter Your Message"
              rows={10}
              className="p-2 bg-transparent border-2 rounded-md text-white focus:outline-none"
            ></textarea>

            <button className=" text-white bg-gradient-to-b from-cyan-500 to-blue-500 px-6 py-3 my-8 mx-auto flex items-center rounded-md hover:scale-110 duration-300">
              Email
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contacts;
