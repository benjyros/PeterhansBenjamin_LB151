import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import { auth, firestore } from "./config";
import { onAuthStateChanged, signInAnonymously, signOut } from 'firebase/auth';
import { collection, getDocs, doc, setDoc, where, query } from "firebase/firestore";

export default function Start() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [name, setName] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                var uid = "";
                if (user !== null) {
                    uid = auth.currentUser.uid;
                }

                const querySnapshotPromise = getDocs(query(collection(firestore, "admins"), where("adminId", "==", uid)));
                querySnapshotPromise.then((querySnapshot) => {
                    if (querySnapshot.empty) {
                        signOut(auth)
                            .then(() => {
                                setIsAdmin(false);
                            })
                            .catch((error) => {
                                console.log(error);
                            })
                    }
                    else {
                        setIsAdmin(true);
                    }
                })
            } else {
                setIsAdmin(false);
            }
        });
        return unsubscribe;
    }, []);

    const handleLogin = (event) => {
        event.preventDefault();
        if (name !== "") {
            signInAnonymously(auth)
                .then(() => {
                    addUserToDB();
                    navigate('/play', { replace: true });
                })
                .catch((error) => {
                    alert(error);
                })
        }
    }

    const addUserToDB = () => {
        setDoc(doc(firestore, "benutzer", auth.currentUser.uid), {
            uid: auth.currentUser.uid,
            name: name,
            balance: 0,
            lives: 3,
            lastSpin: "",
            beforeLastSpin: "",
            highscoreValid: false,
            usedLetters: ""
        });
    }

    return (
        <div className='flex container mx-auto place-content-center mt-40'>
            {isAdmin ? (
                <p className="space-y-4 md:space-y-6">Adminmodus</p>
            ) : (
                <form className="space-y-4 md:space-y-6 grid place-content-center" onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input type="name" name="name" id="name" onChange={(e) => setName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                    </div>
                    <button type="submit" className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg">Spiel spielen!</button>
                </form>
            )}
        </div>
    );
}
