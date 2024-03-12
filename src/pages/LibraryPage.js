import Navbar from "../features/Navbar/Navbar"
import TrendingContributers from "../features/virtualLibrary/components/TrendingContributers"

function LibraryPage() {
  return (
    <div className="bg-Primary-0" style={{ minHeight: "100vh" }}>
      <Navbar />
      <TrendingContributers />
    </div>
  )
}

export default LibraryPage
