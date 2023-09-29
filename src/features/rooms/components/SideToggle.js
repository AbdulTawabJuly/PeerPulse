
function SideToggle()
{
    const HandleMemberClick=()=>{

    }
    const HandleChatClick=()=>{

    }
    const HandleChatGptClick=()=>{

    }
    return(
    <div className="h-96 w-96 bg-white border border-gray-600  rounded-lg flex flex-row items-start lg:block md:block">
       <button onClick={()=>HandleMemberClick()} className="p-3 w-1/3 bg-AuthBtn-0 rounded-tl-lg text-white hover:scale-105 border border-white">
           Members
       </button>
       <button onClick={()=>{HandleChatClick()}} className="p-3 w-1/3 bg-AuthBtn-0 text-white hover:scale-105 border border-white">
           Chat
       </button>
       <button onClick={HandleChatGptClick()} className="p-3 w-1/3 bg-AuthBtn-0 rounded-tr-lg text-white hover:scale-105 border border-white">
           ChatGPT
       </button>
    </div>
    )
}
export default SideToggle;