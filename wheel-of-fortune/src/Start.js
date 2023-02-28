import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import { auth } from "./config";
import { signInAnonymously } from 'firebase/auth';

export default function Start() {
    const [name, setName] = useState("");

    const navigate = useNavigate();

    const handleLogin = (event) => {
        if(name !== ""){
            writeIntoDB();
        }
        else{
            alert("Bitte geben Sie einen Namen ein");
        }
        signInAnonymously(auth)
            .then(() => {
                navigate('/game', { replace: true });
            })
            .catch((error) => {
                alert(error);
            })
    }

    return (
        <div className='Game w-full h-screen place-content-center grid'>
            <form class="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                <div>
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                    <input type="name" name="name" id="name" onChange={(e) => setName(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                </div>
                <button type="submit" class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg">Spiel spielen!</button>
            </form>
        </div>
    );
}