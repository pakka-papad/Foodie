import React, {useEffect, useState} from 'react'
import "./Header.css"
import Logo from "./resources/Logo.png"
import {getAuth} from "firebase/auth"
import db , {auth} from "../firebase"

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

  return (
      <div>
          <div className="header">
              <img src={Logo} alt="Foodie-Logo" className="logo"/>
              <button className="add-favourites-btn" onClick={addToFavourites}>{centreText}</button>
              <img src={displayImage} alt="Avatar" className="avatar"/>
          </div>
      </div>
  )
}

export default RecipeHeader;
