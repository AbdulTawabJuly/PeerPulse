import { Link } from "react-scroll"
import Document from "./Document"
import { useState, useEffect } from "react"

const Main = () => {

  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    // Fetch documents from the backend
    const fetchDocuments = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/document/getDocuments");
        if (response.ok) {
          const data = await response.json();
          console.log("data : ",data)
          const sortedDocuments = data.sort((a, b) => b.no_of_clicks - a.no_of_clicks);
          setDocuments(sortedDocuments);
        } else {
          console.error("Failed to fetch documents:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchDocuments();
  }, []); // Run only once when the component mounts


  return (
    <div className="bg-Main-0 rounded-lg text-sm" style={{ width: '', height: '100%', fontWeight: '500' }}>

      <div className="flex justify-between p-4 items-center">
        <div className="flex gap-2">

          <button className="text-white bg-Secondary-0 px-4 py-1 rounded-full">Popular</button>

          <button className="text-Secondary-0 bg-Primary-0 px-4 py-1 rounded-full">Following</button>

          <button className="text-Secondary-0 bg-Primary-0 px-4 py-1 rounded-full">New</button>
        </div>
        <div className="mr-4">
          <Link to="/upload-document"><h1>Upload</h1></Link>
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
