import React, {useEffect, useState} from "react";
import Navbar from "../components/navbar";
import { useLocation } from "react-router-dom";
import '../App.css';

const UpdateGraduate = () => {
    const location = useLocation();
    const gradID = location.state?.GradID || "";
    const [gradDetails, setGradDetails] = useState("");
    useEffect(() => {
        handleFetchDetails();
    }, []);

    const handleFetchDetails = () => {
        fetch('https://localhost:7172/Graduate/GetGraduate', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id": gradID
            })
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
    const handleUpdateGraduate = () => {
        var name = document.getElementById("name").value;
        var surname = document.getElementById("surname").value;
        var email = document.getElementById("email").value;
        var contact = document.getElementById("phone").value;
        var dateofbirth = document.getElementById("dob").value;
        var current = new Date();
        fetch('https://localhost:7172/Graduate/CreateGraduate',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "graduateID": gradID,
                "firstName": name,
                "lastName": surname,
                "emailAddress": email,
                "dateOfBirth": dateofbirth,
                "contactNumber": contact,
                "dateEdited": `${current.getFullYear()}/${current.getMonth()+1}/${current.getDate()}`,
                "isDeleted": false
            })
        })
        .then((result) => {
            return result.json();
        })
        .then(data => {
            if(data.statusCode === 200){
                console.log(data.data);
                window.location.href = "/viewall";
            }else{
                alert("Could not create a graduate experience");
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
                        UPDATE GRADUATE
                    </div>
                </div>
                <div className="w-1/2 justify-end space-y-0.5">
                    <div className="h-2 bg-blue"></div>
                    <div className="h-2 bg-green"></div>
                    <div className="h-2 bg-orange"></div>
                    <div className="h-2 bg-red"></div>
                </div>
            </div>
            <form className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-3/4">
                <div className="flex flex-wrap gap-y-8 gap-x-8 justify-between">
                    <div className="w-full md:w-[48%] flex flex-col">
                        <label htmlFor="name" className="text-orange orbitronRegular text-sm mb-2">
                            NAME
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="w-full border-none border-b-4 border-white bg-transparent text-black outline-none"
                            placeholder={gradDetails.firstName}
                        />
                    </div>
                    <div className="w-full md:w-[48%] flex flex-col">
                        <label htmlFor="surname" className="text-orange orbitronRegular text-sm mb-2">
                            SURNAME
                        </label>
                        <input
                            type="text"
                            id="surname"
                            className="w-full border-none border-b-4 border-white bg-transparent text-black outline-none"
                            placeholder={gradDetails.lastName}
                        />
                    </div>
                    <div className="w-full md:w-[48%] flex flex-col">
                        <label htmlFor="phone" className="text-orange orbitronRegular text-sm mb-2">
                            PHONE
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            className="w-full border-none border-b-4 border-white bg-transparent text-black outline-none"
                            placeholder={gradDetails.contactNumber}
                        />
                    </div>
                    <div className="w-full md:w-[48%] flex flex-col">
                        <label htmlFor="email" className="text-orange orbitronRegular text-sm mb-2">
                            EMAIL
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full border-b-2 border-b-white text-black outline-none invalid:[&:not(:placeholder-shown):not(:focus)]:border-b-red"
                            placeholder={gradDetails.emailAddress}
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                        />
                    </div>
                    <div className="w-full md:w-[48%] flex flex-col">
                        <label htmlFor="email" className="text-orange orbitronRegular text-sm mb-2">
                            DATE OF BIRTH
                        </label>
                        <input
                            type="date"
                            id="dob"
                            className="w-full border-none border-b-4 border-white bg-transparent text-black outline-none"
                            placeholder={gradDetails.dateOfBirth}
                        />
                    </div>
                    <div className="w-full md:w-[48%] flex flex-col">
                        <button className="absolute flex bg-red text-white mx-8 ps-5 rounded-xl text-lg micro-5" onClick={handleUpdateGraduate} >
                            UPDATE GRADUATE
                            <img className="w-6 m-2 place-items-end" src="../assets/icons/rocket_white.webp" alt="rocket-black"/>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default UpdateGraduate;