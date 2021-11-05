import React from 'react'
import instagram from "./resources/instagram.png"
import "./Contributor.css"

function Contributor(props) {
    return (
        <div className="contributor">
            <a href={props.link} target="_blank">
                <img src={instagram} alt={instagram} className="contributor-profile"></img>
            </a>            
            <h2 className="contributor-name">{props.name}</h2>
        </div>
    )
}

export default Contributor
