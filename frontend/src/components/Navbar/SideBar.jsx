import React from "react";
import "./SideBar.css";
const sideBar = () => {
    return (
        <div>
            <aside className="sidebar">
                <ul>
                    <li>Dashboard</li>
                    <li>Matches</li>
                    <li>Players</li>
                    <li>Teams</li>
                    <li>Seasons</li>
                    <li>Stats</li>
                </ul>
            </aside>
        </div>
    )
}
export default sideBar;