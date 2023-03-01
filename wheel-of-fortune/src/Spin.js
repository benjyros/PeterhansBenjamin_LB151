import React, { useState, useEffect } from "react";
import wheelData from "./wheel.json";
import { useNavigate } from 'react-router-dom';

import { auth, firestore } from "./config";
import { getDoc, doc, updateDoc } from "firebase/firestore";

export default function Spin() {
    const [result, setResult] = useState(null);
    const [lives, setLives] = useState();
    const [balance, setBalance] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            const uid = user.uid;
            const docRef = doc(firestore, "benutzer", uid);
            getDoc(docRef)
                .then((docSnap) => {
                    if (docSnap.exists()) {
                        setLives(docSnap.data().lives);
                        setBalance(docSnap.data().balance);
                    } else {
                        console.log("No such document!");
                    }
                }).catch((error) => {
                    console.log("Error getting document:", error);
                });
        }
    }, []);

    const spinWheel = () => {
        var randomIndex = Math.floor(Math.random() * wheelData.outcomes.length);
        const randomOutcome = wheelData.outcomes[randomIndex].value;
        setResult(randomOutcome);
    };

    const handleResult = () => {
        if (result === "Extra Dreh") {
            return;
        }
        updateUser(result);
        navigate('/play', { replace: true });
    }

    const updateUser = (lastSpin) => {
        const docRef = doc(firestore, "benutzer", auth.currentUser.uid);

        updateDoc(docRef, {
            lastSpin: lastSpin
        });
    }

    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-2 mt-16">
                <div className="col-span-1 ... bg-green-600">
                    <p className="grid place-content-start">Lives: {lives}</p>
                </div>
                <div className="...">
                    <p className="grid place-content-end">Balance: {balance}</p>
                </div>
            </div>

            <div className="mx-auto place-content-center mt-40">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
                    <h1>Spin the Fortune Wheel</h1>
                    <br></br>
                    <label className="btn" onClick={spinWheel} htmlFor="modalResult">Spin the Wheel</label>
                </div>
            </div>

            <input type="checkbox" id="modalResult" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box bg-success text-black">
                    <h3 className="font-bold">Dein Ergebnis</h3>
                    <p className="py-4v">{result}</p>
                    <div className="modal-action">
                        <label htmlFor="modalResult" className="btn" onClick={handleResult}>OK</label>
                    </div>
                </div>
            </div>
        </div>
    );
}
