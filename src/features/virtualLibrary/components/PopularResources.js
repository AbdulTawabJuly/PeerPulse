const PopularResources = () => {
    return (
      <div className="w-80 bg-Main-0 rounded-lg font-body">
        <h1 className="p-4 text-Secondary-0 font-semibold">Popular Resources</h1>
        <div className="flex justify-between p-2">
          <div className="flex gap-4">
            <img src="./Ameer.jpg" className="w-20 h-24" />
            <div className="flex flex-col justify-between">
                <h1 className="text-Secondary-0 font-semibold">Intro to Design and Analysis of Algorithms</h1>
                <p className="text-sm pb-3">Published by Hamza</p>
            </div>
          </div>
        </div>

      </div>
    )
  }
  
  export default PopularResources
  