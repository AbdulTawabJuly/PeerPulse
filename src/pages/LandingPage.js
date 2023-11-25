import About from "../features/LandingPage/About";
import Contacts from "../features/LandingPage/Contacts";
import Features from "../features/LandingPage/Features";
import LNavbar from "../features/LandingPage/LNavbar";
import Contributors from "../features/LandingPage/Contributors";

function LandingPage() {
    return ( 
        <div>
        <LNavbar/>
        <About/>
        <Features/>
        <Contributors/>
        <Contacts/>
        </div>
     );
}

export default LandingPage;