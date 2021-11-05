import React, {useEffect, useState} from 'react'
import "./Header.css"
import Logo from "./resources/Logo.png"
import searchIcon from "./resources/SearchIcon.png"
import {getAuth, signOut} from "firebase/auth"
import db, { auth } from '../firebase'
import axios from 'axios'
import { Menu, Modal, Box, Typography } from '@mui/material';
import { MenuItem } from '@mui/material';
import { useHistory } from 'react-router'
import Contributor from './Contributor'

const Header = (props) => {

    const [displayImage,setDisplayImage] = useState("./resources/Avatar.png");
    const history = useHistory()
    const [query, setQuery] = useState("");
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        const unsubscribe = getAuth().onAuthStateChanged(function(user){
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
        return unsubscribe;
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
            const URL = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${query}&apiKey="4d672d5df6dc4594a03af14864885607"`
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
        history.push("/home")
    }

    const signout = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
          // Sign-out successful.
          console.log("signout successful");
          history.push("/")
        }).catch((error) => {
          // An error happened.
          console.log(error);
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
                        signout();
                        // closeMenu();
                    }}> 
                        Logout 
                    </MenuItem> 
                    <MenuItem onClick={() => {
                        closeMenu();
                        getFavourites();
                    }}> 
                        Profile
                    </MenuItem> 
                    <MenuItem onClick={handleOpen}>
                        Contributors
                    </MenuItem>
                    <Modal open={open} onClose={handleClose} className="contributor-modal">
                        <Box className="contributors-modal-box">
                            <Contributor name={"Arpeit Chourasiya"} link={"https://www.instagram.com/_chourasiya.arpeit_08/"}></Contributor>
                            <Contributor name={"Shikhar Agrawal"} link={"https://www.instagram.com/shikhar._.agrawal/"}></Contributor>
                            <Contributor name={"Siddharth Singh Rana"} link={"https://www.instagram.com/siddharth_93_sr/"}></Contributor>
                            <Contributor name={"Sumit Bera"} link={"https://www.instagram.com/pakka.papad/"}></Contributor>
                            <Contributor name={"Vikas Dheravath"} link={"https://www.instagram.com/"}></Contributor>
                        </Box>
                    </Modal>
                </Menu>
            </div>
        </div>
    )
}

export default Header
