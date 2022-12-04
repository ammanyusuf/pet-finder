import React from 'react';
import {Link} from "react-router-dom";

function Navbar() {
    return (
        <div>
            <ul id="nav-bar">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/feed">Feed</Link>
                </li>
            </ul>
            <hr />
        </div>
    );
}

export default Navbar