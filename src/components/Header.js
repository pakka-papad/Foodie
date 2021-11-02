import React, {useEffect, useState} from 'react'
import "./Header.css"
import Logo from "./resources/Logo.png"
import searchIcon from "./resources/SearchIcon.png"
import {getAuth} from "firebase/auth"
import db, { auth } from '../firebase'
import axios from 'axios'
import { Menu } from '@mui/material';
import { MenuItem } from '@mui/material';
import { useHistory } from 'react-router'

function Header(props) {

    const [displayImage,setDisplayImage] = useState("./resources/Avatar.png");
    const history = useHistory()
    const [query, setQuery] = useState("");

    useEffect(() => {
        getAuth().onAuthStateChanged(function(user){
            if(user){
                console.log(user)
                db.collection("users").doc(user.uid).get()
                .then(doc => {
                    setDisplayImage(doc.data().photoURL);
                    console.log(doc.data().photoURL)
                })
            }
            else{
                console.log("Header.js -> user is null");
            }
        })
    },[]);

    const [menuOpen, setMenuOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState()
  
    const recordButtonPosition = (event) => {
        setAnchorEl(event.currentTarget);
        setMenuOpen(true);
    }
  
    let closeMenu = () => {
        setMenuOpen(false);
    }

    const getData = async() => {
        if(query.trim().toLowerCase() === ""){
            alert("You did not input any item to be searched")
        }else{
            query.trim().toLowerCase().replace(" ", "+")
            const URL = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${query}&apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`
            await axios.get(URL)
            .then(res => {
                console.log(res.data)
                props.setSearchedRecipes(res.data)
                props.setIsSearched(true);
            }).catch(err => {
                console.log(err)
            })
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        getData();
    }

    const goHome = e => {
        e.preventDefault();
        if(props.isSearched === true) props.setIsSearched(false);
    }

    const signout = () => {
        auth.signOut().then(function() {
            // Sign-out successful.
          }, function(error) {
            // An error happened.
        });
    }

    const getFavourites = () => {
        history.push("/profile")
    }

    return (
        <div>
            <div className="header">
                <img src={Logo} alt="Foodie-Logo" className="logo" onClick={goHome}/>
                <form className="search-form" onSubmit={handleSubmit}>
                    <input type="text" className="search-box" onChange={(e) => setQuery(e.target.value)}></input>
                    <button type="submit" className="submit-btn">
                        <img src={searchIcon} alt="search-icon" className="search-icon"/>
                    </button>
                </form>
                <img src={displayImage} alt="Avatar" className="avatar" onClick={recordButtonPosition}/>
                <Menu
                    anchorEl={anchorEl}
                    open={menuOpen}
                    onClose={closeMenu}>
                    <MenuItem onClick={() => {
                        closeMenu();
                        signout();
                    }}> 
                        Logout 
                    </MenuItem> 
                    <MenuItem onClick={() => {
                        closeMenu();
                        getFavourites();
                    }}> 
                        See Favourites
                    </MenuItem> 
                </Menu>
            </div>
        </div>
    )
}

export default Header
