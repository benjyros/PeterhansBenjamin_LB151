import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import wheelData from "./wheel.json";

import { auth, firestore } from "./config";
import { getDoc, getDocs, collection, doc, updateDoc } from "firebase/firestore";

export default function Play() {
    const [hasSpinned, setHasSpinned] = useState(false);

    const [lives, setLives] = useState(3);
    const [balance, setBalance] = useState(0);

    const [result, setResult] = useState(null);

    const [wordIndex, setWordIndex] = useState(0);
    const [vocal, setVocal] = useState('');
    const [consonant, setConsonant] = useState('');
    const [phrasesToGuess, setPhrasesToGuess] = useState([]);
    const [revealedString, setRevealedString] = useState();
    const [guessedLetters, setGuessedLetters] = useState("");
    const [isGuessFinished, setIsGuessFinished] = useState(false);
    const [uid, setUid] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            const phrasesToGuess = [];
            getDocs(collection(firestore, "restricted"))
                .then((snapshot) => {
                    snapshot.forEach((doc) => {
                        const phraseToGuess = {
                            category: doc.data().kategorie,
                            phrase: doc.data().phrase
                        }
                        phrasesToGuess.push(phraseToGuess);
                    });
                    const shuffledPhrasesToGuess = shuffle(phrasesToGuess);
                    setPhrasesToGuess(shuffledPhrasesToGuess);
                    setWordIndex(0);
                    setRevealedString(shuffledPhrasesToGuess[0]?.phrase.replace(/[a-zÄÖÜäöü]/gi, '_'));
                }).catch((error) => {
                    console.log("Error getting documents: ", error);
                });

            setUid(user.uid);
        }
        else {
            navigate('/start', { replace: true });
        }

    }, [navigate]);

    const spinWheel = () => {
        var randomIndex = Math.floor(Math.random() * wheelData.outcomes.length);
        const randomOutcome = wheelData.outcomes[randomIndex].value;
        setResult(randomOutcome);
    };

    const handleResult = () => {
        if (result === "Extra Dreh") {
            return;
        }
        else if (result === "Gratis Vokal") {
            const docRef = doc(firestore, "benutzer", auth.currentUser.uid);

            updateDoc(docRef, {
                beforeLastSpin: result
            });
            return;
        }
        else if (result === "Bankrott") {
            addUserToHighscorlist();
        }
        updateUserLastSpin(result);
        setHasSpinned(true);
        setIsGuessFinished(false);
    }

    const updateUserLastSpin = (lastSpin) => {
        const docRef = doc(firestore, "benutzer", auth.currentUser.uid);

        updateDoc(docRef, {
            lastSpin: lastSpin
        });
    }


    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const checkGuess = (guess) => {
        let count = 0;
        let updatedRevealedString = '';
        const phraseToGuess = phrasesToGuess[wordIndex]?.phrase.toUpperCase();
        for (let i = 0; i < phraseToGuess.length; i++) {
            if (phraseToGuess[i] === guess) {
                updatedRevealedString += guess;
                count++;
            } else if (revealedString[i] !== '_') {
                updatedRevealedString += phraseToGuess[i];
            } else {
                updatedRevealedString += '_';
            }
        }

        setRevealedString(updatedRevealedString);
        if (!updatedRevealedString.includes('_')) {
            alert('Congratulations! You have guessed the phrase.');
            const docRef = doc(firestore, "benutzer", uid);
            updateDoc(docRef, {
                usedLetters: ""
            });

            setWordIndex(wordIndex + 1);
            setRevealedString(phrasesToGuess[wordIndex + 1]?.phrase.replace(/[a-z]/gi, '_'));
            setGuessedLetters("");
        }

        if (guessedLetters === "") {
            setGuessedLetters(guess);
        }
        else {
            setGuessedLetters(guessedLetters + ", " + guess);
        }
        return count;
    }

    const handleGuessVocal = (event) => {
        event.preventDefault();
        if (vocal !== "") {
            const docRef = doc(firestore, "benutzer", uid);
            getDoc(docRef)
                .then((docSnap) => {
                    if (docSnap.data().balance >= 300 || docSnap.data().beforeLastSpin === "Gratis Vokal") {
                        if (docSnap.data().usedLetters.includes(vocal)) {
                            alert("Sie haben dieses Vokal schon gekauft.")
                        }
                        else {
                            updateUser(vocal, docRef, docSnap);
                        }
                    }
                    else {
                        alert("Guthaben zu klein um ein Vokal zu kaufen.")
                    }
                })
        }
        else {
            alert("Bitte geben Sie einen Vokal ein.");
        }
    };

    const handleGuessConsonant = (event) => {
        event.preventDefault();
        if (/^[bcdfghjklmnpqrstvwxyz]$/i.test(consonant)) {
            const docRef = doc(firestore, "benutzer", uid);
            getDoc(docRef)
                .then((docSnap) => {
                    if (docSnap.data().usedLetters.includes(consonant)) {
                        alert("Sie haben diesen Konsonanten schon geraten.")
                    }
                    else {
                        updateUser(consonant, docRef, docSnap);
                    }
                })
        }
        else {
            alert("Bitte geben Sie einen Konsonanten ein.");
        }
    };

    const updateUser = (letter, docRef, docSnap) => {
        updateDoc(docRef, {
            usedLetters: [...docSnap.data().usedLetters, letter]
        });

        const count = checkGuess(letter.toUpperCase());
        let lives = docSnap.data().lives;

        if (count === 0) {
            alert("Leider falsch geraten.");
            lives--;
        }

        updateDoc(docRef, {
            lives: lives
        });

        let balance = docSnap.data().balance + (parseInt(docSnap.data().lastSpin) * count);
        const vowels = ['a', 'e', 'i', 'o', 'u', 'ä', 'ö', 'ü'];

        if (vowels.includes(letter.toLowerCase())) {
            if (docSnap.data().beforeLastSpin === "Gratis Vokal") {
                updateDoc(docRef, {
                    beforeLastSpin: ""
                });
            }
            else {
                balance -= 300;
            }
        }

        updateDoc(docRef, {
            balance: balance
        });

        setLives(lives);
        setBalance(balance);
        setIsGuessFinished(true);

        checkLives(lives);
    }

    const checkLives = (lives) => {
        if (lives === 0) {
            alert("Das Spiel ist zu Ende");
            addUserToHighscorlist();
        }
    }

    const addUserToHighscorlist = () => {
        const docRef = doc(firestore, "benutzer", uid);
        getDoc(docRef)
            .then((docSnap) => {
                if (docSnap.data().balance > 0) {
                    updateDoc(docRef, {
                        highscoreValid: true
                    });
                }
                navigate('/start', { replace: true });
            })
    }

    const showSpinner = () => {
        setHasSpinned(false);
    }

    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-2 mt-16">
                <div className="col-span-1 ...">
                    <p className="grid place-content-start">Leben: {lives}</p>
                </div>
                <div className="...">
                    <p className="grid place-content-end">Guthaben: {balance}</p>
                </div>
            </div>

            {hasSpinned ? (
                <div className="grid grid-cols-2 grid-rows-2 space-x-4 space-y-4 mt-40">
                    <div className="col-start-1 row-span-2 bg-gray-600 p-4 rounded-md">
                        <h1>Kategorie: {phrasesToGuess[wordIndex]?.category}</h1>
                        <h2>{revealedString}</h2>
                        <br></br>
                        <br></br>
                        <h3>Verwendete Buchstaben:</h3>
                        <h3>{guessedLetters}</h3>
                    </div>
                    <div className="col-start-2">
                        <form className="w-40" onSubmit={handleGuessVocal}>
                            <div className="grid grid-cols-2 grid-rows-2">
                                <div className="col-start-1 flex flex-col justify-center grid place-content-center">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Vokal:</label>
                                </div>
                                <div className="col-start-2 flex flex-col justify-center grid place-content-center">
                                    <select onChange={(e) => setVocal(e.target.value)} className="select bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-16 h-8">
                                        <option disabled defaultValue></option>
                                        <option>a</option>
                                        <option>e</option>
                                        <option>i</option>
                                        <option>o</option>
                                        <option>u</option>
                                        <option>ä</option>
                                        <option>ö</option>
                                        <option>ü</option>
                                    </select>
                                </div>
                                <div className="row-start-2 col-span-2 grid mt-2">
                                    <button type="submit" className="btn" disabled={isGuessFinished}>Kaufen</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-start-2 row-start-2">
                        <form className="w-40" onSubmit={handleGuessConsonant}>
                            <div className="grid grid-cols-2 grid-rows-2">
                                <div className="col-start-1 flex flex-col justify-center grid place-content-center">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Konsonant:</label>
                                </div>
                                <div className="col-start-2 flex flex-col justify-center grid place-content-center">
                                    <input type="name" name="name" id="name" onChange={(e) => setConsonant(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-16 h-12" required="" />
                                </div>
                                <div className="row-start-2 col-span-2 grid mt-2">
                                    <button type="submit" className="btn" disabled={isGuessFinished}>Raten</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    {isGuessFinished && <label onClick={showSpinner}>Weiter</label>}
                </div>
            ) : (
                <div className="mx-auto place-content-center mt-40">
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
                        <h1>Spin the Fortune Wheel</h1>
                        <br></br>
                        <label className="btn" onClick={spinWheel} htmlFor="modalResult">Spin the Wheel</label>
                    </div>
                </div>
            )}

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
