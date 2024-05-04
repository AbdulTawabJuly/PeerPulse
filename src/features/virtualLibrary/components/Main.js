import { Link } from "react-scroll"
import Document from "./Document"

const Main = () => {
  return (
    <div className="bg-Main-0 rounded-lg text-sm" style={{ width: '', height: '100%', fontWeight:'500' }}>

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
        <Document />
        <Document />
        <Document />
        <Document />
        <Document />
        <Document />
      </div>


    </div>
  )
}

export default Main
