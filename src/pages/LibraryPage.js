import Navbar from "../features/Navbar/Navbar"
import TrendingContributers from "../features/virtualLibrary/components/TrendingContributers"
import Main from "../features/virtualLibrary/components/Main"

function LibraryPage() {
  return (
    <div className="bg-Primary-0" style={{ minHeight: "100vh" }}>
      <Navbar />
      <Main />
    </div>
  )
}

export default LibraryPage
