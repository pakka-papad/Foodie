import React from 'react'
import logo from "./resources/Logo.png"
import "./Footer.css"
import facebook from "./resources/facebook.png"
import twitter from "./resources/twitter.png"
import instagram from "./resources/instagram.png"
import snapchat from "./resources/snapchat.png"


function Footer() {
    return (
        <div>
            <div className="footer">
                <img src={logo} className="footer-logo"/>
                <div className="social-media-links">
                    <h4>Find Us At</h4>
                    <a href="#">
                        <img src={facebook} className="socials-logo" alt="social-logo"/>
                    </a>
                    <a href="#">
                        <img src={instagram} className="socials-logo" alt="social-logo"/>
                    </a>
                    <a href="#">
                        <img src={twitter} className="socials-logo" alt="social-logo"/>
                    </a>
                    <a href="#">
                        <img src={snapchat} className="socials-logo" alt="social-logo"/>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Footer
