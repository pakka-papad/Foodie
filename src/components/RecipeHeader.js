import React, {useEffect, useState} from 'react'
import "./Header.css"
import Footer from './Footer'
import Logo from "./resources/Logo.png"
import searchIcon from "./resources/SearchIcon.png"
import {getAuth} from "firebase/auth"
import axios from 'axios'

function RecipeHeader(props) {

  const [displayImage,setDisplayImage] = useState("./resources/Avatar.png");

  useEffect(() => {
      getAuth().onAuthStateChanged(function(user){
          if(user){
              setDisplayImage(user.photoURL);
          }
          else{
              console.log("Header.js -> user is null");
          }
      })
  },[]);

  return (
      <div>
          <div className="header">
              <img src={Logo} alt="Foodie-Logo" className="logo"/>
              <form className="search-form" >
                    <input type="text" className="search-box"></input>
                    <button type="submit" className="submit-btn">
                        <img src={searchIcon} alt="search-icon" className="search-icon"/>
                    </button>
              </form>
              <img src={displayImage} alt="Avatar" className="avatar"/>
          </div>
      </div>
  )
}

export default RecipeHeader;
