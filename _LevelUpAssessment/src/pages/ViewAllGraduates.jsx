import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import '../App.css';

const ViewAllGraduates = () => {
    const [allGraduates, setAllGraduates] = useState([]);
    const [showDeletePopUp, setShowDeletePopUp] = useState(false);
    const [selectedGraduate, setSelectedGraduate] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        handleGetAllGraduates();
    }, []);

    const handleGetAllGraduates = () => {
        fetch('https://localhost:7172/Graduate/GetAllGraduates', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((result) => result.json())
        .then(data => {
            if(data.statusCode === 200){
                setAllGraduates(data.data);
            } else{
                alert("No graduates");
            }
        })
    };

    const handleDeleteGraduate = () => {
        fetch('https://localhost:7172/Graduate/DeleteGraduate', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ GraduateID: selectedGraduate.GraduateID }),
        })
        .then(result => result.json())
        .then(data => {
            if(data.data === 200){
                setShowDeletePopUp(false);
                handleGetAllGraduates(); // Refresh the graduates list
            }
        });
    };

    const handleViewMode = (GradID) => {
        navigate(`/customer/${GradID}`, { state: { GradID } });
    };

    const handleUpdate = (GradID) => {
        navigate(`/update/${GradID}`, { state: { GradID } });
    };

    const handleDelete = (graduate) => {
        setSelectedGraduate(graduate);
        setShowDeletePopUp(true);
    };

    return (
        <div>
            <Navbar />
            <section className="md:px-12 px-4 mt-6">
                <table className="w-full border border-white md:rounded-t-xl rounded-t-lg overflow-hidden">
                    <thead className="bg-white uppercase micro-5 text-3xl">
                        <tr>
                            <th className="md:rounded-s-xl rounded-s-lg md:py-2 py-1 md:px-8 px-4">
                                <div className="relative flex justify-start items-center">
                                    Full Name
                                    <img src="../assets/icons/rocket_black.webp" alt="rocket-black" className="absolute right-0 h-2/3 md:block hidden" />
                                </div>
                            </th>
                            <th className="md:py-2 py-1 md:px-8 px-4 md:block hidden">
                                <div className="relative flex justify-start items-center">
                                    Contact Details
                                    <img src="../assets/icons/rocket_black.webp" alt="rocket-black" className="absolute right-0 h-2/3" />
                                </div>
                            </th>
                            <th className="md:rounded-e-xl rounded-e-lg md:py-2 py-1 md:px-8 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-white">
                        {allGraduates.length > 0 ? 
                            allGraduates.map((graduate) => (
                                <tr key={graduate.GraduateID}>
                                    <td className="md:py-4 py-2 md:px-8 px-4">
                                        <span>
                                            <div className=" orbitronBold text-white">{graduate.firstName}</div>
                                            <div className=" orbitronRegular text-white">{graduate.lastName}</div>
                                        </span>
                                    </td>
                                    <td className="md:py-4 py-2 md:px-8 px-4 text-white md:block hidden">{graduate.emailAddress}</td>
                                    <td className="md:py-4 py-2 md:px-8 px-4">
                                        <button className="border-orange border-2 text-orange micro-5 rounded-lg" onClick={() => handleViewMode(graduate.graduateID)}>VIEW MODE</button>
                                        <button className="border-green border-2 text-green micro-5 rounded-lg" onClick={() => handleUpdate(graduate.graduateID)}>UPDATE</button>
                                        <button className="border-red border-2 text-red micro-5 rounded-lg" onClick={() => handleDelete(graduate)}>DELETE</button>
                                    </td>
                                </tr>   
                            ))
                        : (
                            <div>No Graduates Listed</div>
                        )}
                    </tbody>
                </table>
            </section>

            {showDeletePopUp && (
                <div className="w-screen h-screen bg-white flex justify-center">
                    <div className="text-sm bg-black font-micro5">DELETE GRADUATE</div>
                    <div className="text-lg bg-black">DELETE</div>
                    <div className="md:py-4 py-2 md:px-8 px-4">
                        <div className="font-orbitronBold">{selectedGraduate?.FirstName}</div>
                        <div className="font-orbitronRegular">{selectedGraduate?.LastName}</div>
                    </div>
                    <div className="flex flex-col justify-center ">
                        <button className="border border-red text-red" onClick={handleDeleteGraduate}>DELETE</button>
                        <button className="border border-green text-green" onClick={() => setShowDeletePopUp(false)}>CANCEL</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ViewAllGraduates;
