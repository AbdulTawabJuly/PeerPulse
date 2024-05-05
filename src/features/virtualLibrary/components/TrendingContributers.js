import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
const { selectLoggedInUser } = require("../../../features/auth/authSlice");

const TrendingContributers = () => {

  const user = useSelector(selectLoggedInUser);
  const [trendingContributers, setTrendingContributers] = useState([]);


  useEffect(() => {
    const fetchContributers = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/document/getTrendingContributors');
        const data = await response.json();
        setTrendingContributers(data);
      }
      catch (error) {
        console.log(error);
      }

    }
    fetchContributers();
  }, [])

  const handleFollow = async (userId) => {
    try {
      const response = await fetch('http://localhost:8080/api/document/followContributor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: userId, // Pass the user's ID here
          followerId: user.user.id
        })
      });
      const result = await response.json();
      console.log(result)
    } catch (error) {
      console.error('Error following contributor:', error);
    }
  }

  return (
    <div className="w-80 bg-Main-0 rounded-lg font-body max-h-96 overflow-scroll w-full">
      <h1 className="p-2 text-Secondary-0 font-semibold p-4">Trending Contributers</h1>

      {trendingContributers && trendingContributers.map((contributer, index) => (
      <div className="flex justify-between px-4 py-2" key={contributer._id}>
        <div className="flex items-center ">
          <p className=" text-Secondary-0" >{contributer.name}</p>
        </div>
        <div>
          <button onClick={() => handleFollow(contributer._id)} className="rounded rounded-md px-3 py-1 bg-Secondary-0 text-white w-full mr-2">Follow</button>
        </div>
      </div>
      ))}

    </div>
  )
}

export default TrendingContributers;
