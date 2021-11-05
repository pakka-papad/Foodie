import React, {useEffect, useState} from 'react'
import "./Header.css"
import Logo from "./resources/Logo.png"
import {getAuth, signOut} from "firebase/auth"
import { useHistory } from 'react-router'
import db , {auth} from "../firebase"
import { Menu } from '@mui/material';
import { MenuItem } from '@mui/material';


function RecipeHeader(props) {

  const history = useHistory();
  const [displayImage,setDisplayImage] = useState("./resources/Avatar.png");

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

  const [centreText,setCentreText] = useState("");

  useEffect(() => {
    const recipe = props.recipeInfo;
    var docRef = db.collection("users").doc(auth.currentUser.uid).collection("favourites").doc(recipe.id.toString());
    docRef.get()
    .then((doc) => {
        if(doc.exists) setCentreText("Favourite");
        else setCentreText("Add to favourites");
    })
    .catch((error) => console.log(error));
  },[]);

  //addToFavourites() function
  const addToFavourites = () => {
    if(centreText === "Favourite") return;
    const recipe = props.recipeInfo;
    const recipeObj = {
        imageURL: recipe.image,
        title: recipe.title
    };
    var docRef = db.collection("users").doc(auth.currentUser.uid).collection("favourites").doc(recipe.id.toString());
    docRef.set(recipeObj)
    .then(() => {
        console.log("added to favourites");
        setCentreText("Favourite");
    })
    .catch((error) => console.log(error,"could not add to favourites"));
  }

  // navigateToHome() function
  const goHome = e => {
    e.preventDefault();
    history.push("/home");
  }

  // signout() function
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

  // viewFavourites() function
  const getFavourites = () => {
    history.push("/profile")
  }

  return (
      <div>
          <div className="header">
              <img src={Logo} alt="Foodie-Logo" className="logo" onClick={goHome}/>
              <button className="add-favourites-btn" onClick={addToFavourites}>{centreText}</button>
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
                </Menu>
          </div>
      </div>
  )
}

export default RecipeHeader;
