const Document = () => {
    return (
        <div className="w-32 relative mx-auto sm:mx-0">
            <div className="w-32 h-48 overflow-hidden">

                <img src="/novel.jpeg" alt="book image" className="w-full h-full object-cover rounded-md" />

            </div >
            <div>
                <div className="">
                    <div className="max-w-full flex-col p-1">
                        <h2 className="text-wrap overflow-x-hidden text-Secondary-0">Novel</h2>
                        <h2 className="text-wrap overflow-x-hidden font-light">Ameer Hamza</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Document