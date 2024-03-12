const TrendingContributers = () => {
  return (
    <div className="w-96 bg-Main-0 rounded-lg">
      <h1 className="p-2">Trending Contributers</h1>
      <div className="flex justify-between p-2">
        <div className="flex items-center gap-2">
          <img src="./Ameer.jpg" className="w-8 h-8 rounded-full object-contain" />
          <p>Ameer Hamza</p>
        </div>
        <div>
          <button className="rounded rounded-md p-2 bg-Primary-0 mr-2">Follow</button>
        </div>

      </div>
    </div>
  )
}

export default TrendingContributers
