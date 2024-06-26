import Navbar from "../features/Navbar/Navbar"
import TrendingContributers from "../features/virtualLibrary/components/TrendingContributers"
import PopularResources from "../features/virtualLibrary/components/PopularResources"
import Sidebar from "../features/virtualLibrary/components/Sidebar"
import Main from "../features/virtualLibrary/components/Main"

function LibraryPage() {
  return (
    <div className="bg-Primary-0 overflow-scroll" style={{ height: "100vh" }}>
      <Navbar />
      <div className="grid grid-cols-7 mt-8" style={{height:'85vh'}}>
        <div className="col-span-1 mx-4">
          <Sidebar />
        </div>
        <div className="col-span-4">
          <Main />
        </div>
        <div className="col-span-2 mx-auto flex flex-col gap-8 w-full px-10">
          <input type="text" placeholder="search" className="p-4 rounded-lg"/>
          <TrendingContributers />
        </div>
      </div>
      
    </div>
  )
}

export default LibraryPage
