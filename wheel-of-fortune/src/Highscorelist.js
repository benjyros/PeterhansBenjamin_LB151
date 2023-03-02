import React, { useState, useEffect } from "react";

import { auth, firestore } from "./config";
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDocs, collection, orderBy, query, where, deleteDoc } from "firebase/firestore";

export default function Highscorelist() {
    const [highscorelistExists, setHighscorelistExists] = useState(false);
    const [highScores, setHighScores] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);


    useEffect(() => {
        const users = [];
        getDocs(query(collection(firestore, "benutzer"), where("highscoreValid", "==", true), orderBy("balance", "desc")))
            .then((snapshot) => {
                let i = 1;
                snapshot.forEach((doc, index) => {
                    users.push({
                        id: doc.id,
                        name: doc.data().name,
                        time: doc.data().time,
                        balance: doc.data().balance,
                        rounds: doc.data().rounds,
                        rank: i
                    });
                    i++;
                });
                users.reverse();
                setHighScores(users);
                setHighscorelistExists(users.length > 0);
            }).catch((error) => {
                console.log("Error getting documents: ", error);
            });

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                var uid = "";
                if (user !== null) {
                    uid = auth.currentUser.uid;
                }

                const querySnapshotPromise = getDocs(query(collection(firestore, "admins"), where("adminId", "==", uid)));
                querySnapshotPromise.then((querySnapshot) => {
                    if (querySnapshot.empty) {
                        setIsAdmin(false);
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

    const handleDeleteUser = (id) => {
        const updatedHighScores = highScores.filter((user) => user.id !== id);
        setHighScores(updatedHighScores);
        // Delete the user document from Firestore
        deleteDoc(doc(firestore, "benutzer", id));
    };

    return (
        <div className='flex container mx-auto place-content-center mt-40'>
            {highscorelistExists ? (
                <div class="overflow-x-auto">
                    <h1>High Scores</h1>
                    <table class="table table-compact w-full">
                        <thead>
                            <tr>
                                <th>Rang</th>
                                <th>Name</th>
                                <th>Zeit</th>
                                <th>Guthaben</th>
                                <th>Runden</th>
                                {isAdmin && <th></th>}
                            </tr>
                        </thead>
                        <tbody>
                            {highScores.map((user) => (
                                <tr>
                                    <th>{user.rank}</th>
                                    <td>{user.name}</td>
                                    <td>{user.time}</td>
                                    <td>{user.balance}</td>
                                    <td>{user.rounds}</td>
                                    {isAdmin &&
                                        <td>
                                            <label className="link" onClick={() => handleDeleteUser(user.id)}>Delete</label>
                                        </td>
                                    }
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <h1>Keine Daten verfügbar</h1>
            )}
        </div>
    );
}
