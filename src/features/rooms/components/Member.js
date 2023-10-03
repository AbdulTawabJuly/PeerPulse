function Member({username}){
   return (
    <div className="flex flex-row items-center p-3 px-0 w-full border-b border-gray-600">
        <img  className="w-10 h-10 border border-black rounded-full mx-3" src="../profile.png" alt="img"></img>
        <p>{username}</p>
    </div>
   )
}
export default Member;