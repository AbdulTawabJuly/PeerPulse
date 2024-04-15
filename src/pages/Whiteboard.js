import Main from '../features/whiteboard/components/Main';
import Navbar from '../features/Navbar/Navbar';
function Whiteboard() {
    return (
        <div className="bg-Primary-0" style={{ height: "100vh" }}>
            <Navbar />
            <div style={{height:'90vh'}}>
                <Main />
            </div>
            
        </div>
    )
}

export default Whiteboard;