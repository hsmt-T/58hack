import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
    return (
        <header className="fixed top-0 w-full left-0 bg-pink-500 py-8 px-4 rounded-t-2xl">
            <div className="flex justify-around items-center gap-x-26" >
                <img src="/heart-with-mouse.png" alt="Top" className="w-12 h-12" onClick={() => navigate("/Top")} />
                <button type="button" className="text-xl text-red-100 font-bold" onClick={() => navigate("/Top")}>
                    Rikeinder
                </button>
            </div>
        </header>
    )
}

export default Header;