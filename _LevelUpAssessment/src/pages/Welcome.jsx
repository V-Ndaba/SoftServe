import React from "react";
import '../App.css';
import { useNavigate } from "react-router-dom";
const Welcome = () => {
    const navigate = useNavigate();
    const handleViewAllGraduates = () => {
        navigate(`/viewall`);
        //window.location.href("/ViewAllGraduates");
    }
    return (
        //background image: spacebackground
        //logo centered top softserve-logo
        //cover illustration on right
        //
        <div className="bg-cover bg-center h-screen w-screen overflow-hidden" style={{backgroundImage: "url('../assets/backgrounds/space-background.webp')" }}>
            
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                <img className="h-16" src="../assets/logos/softserve-logo.webp" alt="softserve-logo"/>
            </div>
            
            {/*Left Pane*/}
            <div className="absolute left-0 top-2 h-full flex flex-col justify-center space-y-0.25">
                <img className="w-2/3 ps-8" src="../assets/logos/time-to-level-up.webp" alt="time-to-level-up"></img>
                <button className="relative flex bg-red text-white w-1/5 mx-8 ps-5 rounded-xl text-lg micro-5" onClick={handleViewAllGraduates} >
                    VIEW GRADUATE
                    <img className="w-6 m-2 place-items-end" src="../assets/icons/rocket_white.webp" alt="rocket-black"/>
                </button>
            </div>

            <div className="absolute bottom-14 w-full flex flex-col space-y-0.5 z-0">
                    <div className="h-4 bg-blue w-full"></div>
                    <div className="h-4 bg-green w-full"></div>
                    <div className="h-4 bg-orange w-full"></div>
                    <div className="h-4 bg-red w-full"></div>
                </div>
            {/*Right Pane*/}
            <div className="absolute right-0 top-2 h-full flex justify-center items-center">
                <img className="h-full object-right" src="../assets/illustrations/cover.webp" alt="cover"></img>
            </div>

        </div>
        

    )
}

export default Welcome;