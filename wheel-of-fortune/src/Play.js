import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "./Header";

import { auth, firestore } from "./config";
import { getDocs, collection, doc, updateDoc } from "firebase/firestore";

export default function Play() {
    const [wordIndex, setWordIndex] = useState(0);
    const [vocal, setVocal] = useState('');
    const [consonant, setConsonant] = useState('');
    const [guess, setGuess] = useState('');
    const [phrasesToGuess, setPhrasesToGuess] = useState([]);
    const [phraseToGuess, setPhraseToGuess] = useState("");
    const [guessedPhrase, setGuessedPhrase] = useState();

    useEffect(() => {
        var phrasesToGuess = [];
        getDocs(collection(firestore, "restricted"))
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    const phraseToGuess = {
                        category: doc.data().kategorie,
                        phrase: doc.data().phrase
                    }
                    phrasesToGuess.push(phraseToGuess);
                });
                setPhrasesToGuess(phrasesToGuess);
                setGuessedPhrase(phrasesToGuess[0].phrase.split("").map((letter) => (guess.includes(letter) ? letter : "_")).join(" "));
            }).catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }, []);

    const handleGuessVocal = () => {
        if (vocal !== "") {
            setGuessedPhrase(
                phrasesToGuess[0].phrase
                    .split("")
                    .map((letter) => (guess.includes(letter) ? letter : "_"))
                    .join(" ")
            );
        }
        else {
            alert("Bitte geben Sie einen Vokal ein.");
        }
        setGuess("");
    };

    const handleGuessConsonant = () => {
        if (/^[bcdfghjklmnpqrstvwxyz]$/i.test(consonant)) {
            setGuessedPhrase(
                phrasesToGuess[0].phrase
                    .split("")
                    .map((letter) => (guess.includes(letter) ? letter : "_"))
                    .join(" ")
            );
        }
        else {
            alert("Bitte geben Sie einen Konsonanten ein.");
        }
        setGuess("");
    };

    return (
        <div className="container mx-auto">
            <Header />
            <div className="grid grid-cols-2 grid-rows-2 space-x-4 space-y-4 mt-40">
                <div className="col-start-1 row-span-2 bg-blue-600">
                    <h1>Kategorie: {phrasesToGuess[0]?.category}</h1>
                    <h2>Guess the Phrase:</h2>
                    <h2>{guessedPhrase}</h2>
                </div>
                <div className="col-start-2">
                    <form className="w-40" onSubmit={handleGuessVocal}>
                        <div className="grid grid-cols-2 grid-rows-2">
                            <div className="col-start-1 bg-green-600 flex flex-col justify-center grid place-content-center">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Vokal:</label>
                            </div>
                            <div className="col-start-2 flex flex-col justify-center grid place-content-center">
                                <select onChange={(e) => setVocal(e.target.value)} className="select bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-16 h-8">
                                    <option disabled defaultValue>{vocal}</option>
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
                            <div className="row-start-2 col-span-2 bg-purple-600 grid place-content-center">
                                <button type="submit" className="btn">Kaufen</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="col-start-2 row-start-2">
                    <form className="w-40" onSubmit={handleGuessConsonant}>
                        <div className="grid grid-cols-2 grid-rows-2">
                            <div className="col-start-1 bg-green-600 flex flex-col justify-center grid place-content-center">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Konsonant:</label>
                            </div>
                            <div className="col-start-2 flex flex-col justify-center grid place-content-center">
                                <input type="name" name="name" id="name" onChange={(e) => setConsonant(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-10 h-8" required="" />
                            </div>
                            <div className="row-start-2 col-span-2 bg-purple-600 grid place-content-center">
                                <button type="submit" className="btn">Raten</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
