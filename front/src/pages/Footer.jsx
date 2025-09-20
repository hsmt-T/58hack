import React from 'react';
import { useNavigate } from "react-router-dom";

function Footer() {
    const navigate = useNavigate();
    return(
        <footer className="fixed bottom-0 w-full left-0 bg-pink-100 py-8 px-4 rounded-b-2xl">
            <div className='flex justify-around items-center gap-x-26'>
                    <img src="/heart-with-mouse.png" alt="Top" className="w-14 h-14" onClick={() => navigate("/Top")} />
                    <img src="/messages-mac.png" alt="Messages" className="w-14 h-14" onClick={() => navigate("/Messages")} />
                    <img src="/guest-male.png" alt="Plofile" className="w-14 h-14" onClick={() => navigate("/Plofile")} />
            </div>
        </footer>
)
}

export default Footer;