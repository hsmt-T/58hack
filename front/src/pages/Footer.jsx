<footer>
    <div>
        <p id="plofile"><img src="/front/assets/guest-male.png" /></p>
        <p id="top"><img src="/front/assets/heart-with-mouse.png" /></p>
        <p id="messages"><img src="/front/assets/messages-mac.png" /></p>
    </div>
</footer>

document.getElementById("top").addEventListener("click", function() {
    location.replace("Top.jsx");
}, false );
document.getElementById("messages").addEventListener("click", function() {
    location.replace("Messages.jsx");
}, false );
document.getElementById("plofile").addEventListener("click", function() {
    location.replace("Plofile.jsx");
}, false );

import React from 'react'
import { Link } from react-rooter-dom;

function Footer() {
    return(
        <footer>
            <div>
                <Link to = "/Plofile"></Link>
            </div>
    )
}