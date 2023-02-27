import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

import { auth } from './config';
import { onAuthStateChanged, signOut } from 'firebase/auth';

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
            return unsubscribe;
        });
    }, []);

    const handleSignOut = () => {
        signOut(auth).then(() => {
            navigate('/start');
        })
            .catch((error) => {
                alert(error.message);
            })
    }

    return (
        <div className="navbar bg-base-100 fixed">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex="0" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link to='/game'>Game</Link></li>
                        <li><Link to='/highscorelist'>Highscorelist</Link></li>
                    </ul>
                </div>
                {isLoggedIn ? (
                    <p className="btn btn-ghost normal-case text-xl">Wheel Of Fortune - Adminmodus</p>
                ) : (
                    <p className="btn btn-ghost normal-case text-xl">Wheel Of Fortune</p>
                )}
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><Link to='/game'>Game</Link></li>
                    <li><Link to='/highscorelist'>Highscorelist</Link></li>
                </ul>
            </div>
            <div className="navbar-end">
                {isLoggedIn ? (
                    <label onClick={handleSignOut} className='btn' htmlFor="modalSignOut" >Abmelden</label>
                ) : (
                    <Link to='/login' className='btn' htmlFor="modalSignIn">Anmelden</Link>
                )}

                <input type="checkbox" id="modalSignOut" className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box bg-success text-black">
                        <h3 className="font-bold">Success!</h3>
                        <p className="py-4v">You've been logged out successfully!</p>
                        <div className="modal-action">
                            <label htmlFor="modalSignOut" className="btn">OK</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;