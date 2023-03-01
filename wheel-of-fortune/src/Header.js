import React, { useState, useEffect } from "react";

import { auth, firestore } from "./config";
import { getDoc, doc } from "firebase/firestore";

export default function Header() {
    const [lives, setLives] = useState();
    const [balance, setBalance] = useState();

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

    return (
        <div className="grid grid-cols-2 mt-16">
            <div className="col-span-1 ...">
                <p className="grid place-content-start">Lives: {lives}</p>
            </div>
            <div className="...">
                <p className="grid place-content-end">Balance: {balance}</p>
            </div>
        </div>
    );
}
