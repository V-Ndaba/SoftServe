import React from "react";
import '../App.css';
import Navbar from "../components/navbar";

const Welcome = () => {
    return (
        //background image: spacebackground
        //logo centered top softserve-logo
        //cover illustration on right
        //
        <div style="backgroundImage: src='./public/assets/backgrounds/space-background.webp`">
            
            <image src="../assets/logos/softserve-logo.webp" className="relative flex justify-start items-center" />
            <div>
                <image src="../assets/logos/time-to-level-up.webp" className="absolute left-0 h-2/3"/>
            </div>
            <div>
                <image src="../assets/illustrations/cover.webp" className="absolute right-0 h-2/3"/>
            </div>
            <button className="colour:red">
                <image src="../assets/icons/rocket_white.webp"/>
                View Graduates
            </button>
        </div>
        

    )
}

export default Welcome;