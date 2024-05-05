import { Link } from "react-router-dom";
import Document from "./Document"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { selectLoggedInUser } from "../../auth/authSlice"

const Main = () => {

  const [documents, setDocuments] = useState([]);
  const [activeTab, setActiveTab] = useState("Popular"); // Default active tab
  const user = useSelector(selectLoggedInUser);

  const fetchDocuments = async () => {
    try {
      let url = "http://localhost:8080/api/document/getDocuments";
      if (activeTab === "Following") {
        url = `http://localhost:8080/api/document/getFollowerDocuments?userId=${user.user.id}`;
      } else if (activeTab === "New") {
        url = "http://localhost:8080/api/document/getLatestDocuments";
      }
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        console.log("data : ", data);
        let sortedDocuments;
        if (activeTab === "Popular") {
          sortedDocuments = data.sort((a, b) => b.noOfClicks - a.noOfClicks);
        } else {
          sortedDocuments = data;
        }
        setDocuments(sortedDocuments);
      } else {
        console.error("Failed to fetch documents:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  useEffect(() => {
    // Fetch documents from the backend
    fetchDocuments();
  }, [activeTab]); // Fetch documents whenever activeTab changes

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="bg-Main-0 rounded-lg text-sm" style={{ width: '', height: '100%', fontWeight: '500' }}>

      <div className="flex justify-between p-4 items-center">
        <div className="flex gap-2">
          <button className={`px-4 py-1 rounded-full ${activeTab === "Popular" ? "bg-Secondary-0 text-white" : "bg-Primary-0 text-black"}`} onClick={() => handleTabClick("Popular")}>Popular</button>
          <button className={`px-4 py-1 rounded-full ${activeTab === "Following" ? "bg-Secondary-0 text-white" : "bg-Primary-0 text-black"}`} onClick={() => handleTabClick("Following")}>Following</button>
          <button className={`px-4 py-1 rounded-full ${activeTab === "New" ? "bg-Secondary-0 text-white" : "bg-Primary-0 text-black"}`} onClick={() => handleTabClick("New")}>New</button>

        </div>
        <div className="mr-4">
          <Link to="/document/upload" className="cursor-pointer">Upload</Link>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4 p-4">
        {documents && documents.map((document, index) => (
          <Document key={index} document={document} />
        ))}
      </div>
    </div>
  )
}

export default Main
