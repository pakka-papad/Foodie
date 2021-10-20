import React, {useEffect, useState} from 'react'
import "./Header.css"
import Logo from "./resources/Logo.png"
import searchIcon from "./resources/SearchIcon.png"
import {getAuth} from "firebase/auth"
import axios from 'axios'

function Header(props) {

    const [displayImage,setDisplayImage] = useState("./resources/Avatar.png");
    const [query, setQuery] = useState("");

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

    const getData = async() => {
        if(query.trim().toLowerCase() === ""){
            alert("You did not input any item to be searched")
        }else{
            query.trim().toLowerCase().replace(" ", "+")
            const URL = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${query}&number=4&apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`
            await axios.get(URL)
            .then(res => {
                console.log(res.data)
                props.setRecipes(res.data)
            }).catch(err => {
                console.log(err)
            })
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        getData();
    }

    return (
        <div>
            <div className="header">
                <img src={Logo} alt="Foodie-Logo" className="logo"/>
                <form className="search-form" onSubmit={handleSubmit}>
                    <input type="text" className="search-box" onChange={(e) => setQuery(e.target.value)}></input>
                    <button type="submit" className="submit-btn">
                        <img src={searchIcon} alt="search-icon" className="search-icon"/>
                    </button>
                </form>
                <img src={displayImage} alt="Avatar" className="avatar"/>
            </div>
        </div>
    )
}

export default Header
