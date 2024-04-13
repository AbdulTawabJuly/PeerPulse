const Sidebar = () => {
    return (
        <div style={{height:'100%'}} className='bg-Main-0 rounded-lg font-body w-42 p-4'>
            <div className="flex flex-col gap-4 mt-5">
                <button className="border-0 bg-Primary-0 p-2 rounded-lg">Home</button>
                <button className="border-0">Discover</button>
                <button className="border-0">Bookmark</button>
                <button className="border-0">Settings</button>
                <button className="border-0">Help</button>
            </div>

        </div>
    )
}

export default Sidebar