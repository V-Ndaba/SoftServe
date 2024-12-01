import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";

import '../App.css';
import { useLocation } from "react-router-dom";

const ViewGraduate = () => {
    const location = useLocation();
    const gradID = location.state?.GradID || "";
    const [gradDetails, setGradDetails] = useState("");
    useEffect(() => {
        handleFetchDetails();
    }, []);

    const handleFetchDetails = () => {
        var url = `https://localhost:7172/Graduate/GetGraduate?query=${encodeURIComponent(gradID)}`
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((result) => {
            return result.json();
        })
        .then(data =>{
            if(data.statusCode === 200){
                console.log(data.data);
                setGradDetails(data.data);
            }else{
                alert("Graduate cannot be found");
            }

        })
    }
    return (
        <div>
            <Navbar />
            <div className="absolute top-24 left-8 w-full flex items-center mt-16">
                <div className="text-white text-xs pl-5 md:text-sm orbitronRegular w-full">
                    LEVEL UP 2024
                </div>
            </div>
            <div className="flex w-full mt-24">
                <div className=" flex justify-center items-center">
                    <div className="text-white mx-12 text-3xl md:text-5xl orbitronBold text-center">
                        VIEW GRADUATE DETAILS
                    </div>
                </div>
                <div className="w-1/3 justify-end space-y-0.5">
                    <div className="h-2 bg-blue"></div>
                    <div className="h-2 bg-green"></div>
                    <div className="h-2 bg-orange"></div>
                    <div className="h-2 bg-red"></div>
                </div>
            </div>
        </div>

    )
}

export default ViewGraduate;