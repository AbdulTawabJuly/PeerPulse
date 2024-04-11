import Navbar from "../features/Navbar/Navbar"
import TrendingContributers from "../features/virtualLibrary/components/TrendingContributers"
import PopularResources from "../features/virtualLibrary/components/PopularResources"
import Main from "../features/virtualLibrary/components/Main"

function LibraryPage() {
  return (
    <div className="bg-Primary-0" style={{ minHeight: "100vh" }}>
      <Navbar />
      <div className="grid grid-cols-7 gap-10 mt-8">
        <div className="col-span-1">
          <h1>Sidebar</h1>
        </div>
        <div className="col-span-4">
          <Main />
        </div>
        <div className="col-span-2 mx-auto">
          <TrendingContributers />
        </div>
      </div>
      
    </div>
  )
}

export default LibraryPage
