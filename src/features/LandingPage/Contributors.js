import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Contributors() {
  const contributors = [
    {
      id: "1",
      name: "Ameer Hamza",
      img: "/Ameer.jpg",
      review: "I am a skilled leader with a strong foundation in MERN stack development. As a senior member of the team, I bring a wealth of experience in steering projects to success, backed by a track record of leading cross-functional teams with precision",
    },
    {
      id: "2",
      name: "Abdul Tawab",
      img: "/Tawab2.jpg",
      review: `Passionate and creative junior-year computer science student specializing in MERN stack
      development. Adept problem solver with a track record of building projects and collaborating
      effectively within cross-functional teams. Enthusiastic about programming.`,
    },
    {
      id: "3",
      name: "Suhaib Rashid",
      img: "/Suhaib.jpg",
      review: "As a passionate and driven individual, I am a programming virtuoso and project architect.With a proven track record of successfully bringing projects to life, I pride myself on my commitment to innovation and cutting-edge development. My programming finesse and project-building acumen redefine what's possible, and I am excited to continue pushing the boundaries of what can be achieved in our collaborative endeavors.",
    },
    {
      id: "4",
      name: "Zaid Asif",
      img: "/Zaid.jpg",
      review: "Specializing in artificial intelligence, my journey is defined by a deep understanding of machine learning algorithms and a relentless pursuit of cutting-edge solutions. As a seasoned AI specialist, my passion for pushing the boundaries of what's possible is evident in every line of code.Excited to continue my journey of shaping the future through the lens of artificial intelligence.",
    },
    {
      id: "5",
      name: "Hamza Amer",
      img: "/Hamza.jpg",
      review: "Embarking on the path of full-stack development in Python, I find purpose in weaving the intricate threads of front-end and back-end technologies.My expertise spans the entire spectrum of development, from crafting seamless user interfaces to building robust server-side logic. With a passion for Python and a commitment to creating dynamic and responsive web applications, I take pride in my role as a full-stack developer. ",
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slideToShow: 3,
    slideToScroll: 3,
  };
  return (
    <div
      name="contributors"
      className=" bg-gradient-to-b from-black to-gray-800 w-full h-screen"
    >
      <div className=" max-w-screen-lg mx-auto p-4 flex flex-col justify-center w-full h-full text-white">
        <div>
          <p className="text-4xl font-bold border-b-4 border-gray-500 inline p-2">
            Contributors
          </p>
        </div>

        <div className=" w-3/4 m-auto">
          <div className="mt-20">
            <Slider {...settings}>
              {contributors.map((contributor) => (
                <div
                  key={contributor.id}
                  className="bg-white h-[450px] text-black rounded-xl"
                >
                  <div className=" h-56 rounded-t-xl flex justify-center bg-gradient-to-b from-black to-gray-800 items-center">
                    <img
                      src={contributor.img}
                      alt={contributor.name}
                      className=" h-44 w-44 rounded-full"
                    />
                  </div>

                  <div className=" flex flex-col justify-center items-center gap-4 p-4">
                    <p className="text-xl font-semibold font-signature">
                      {contributor.name}
                    </p>
                    <p className=" font-Raleway font-bold">{contributor.review}</p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contributors;
