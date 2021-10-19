import React from 'react'
import { auth } from '../firebase'
import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Header from './Header'
import "./Home.css"
import RecipeCard1 from './RecipeCard1'
import Footer from './Footer'
import {getAuth} from "firebase/auth"
import axios from 'axios'

const Home = () => {

  const history = useHistory()
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      if (userAuth) {

      } else {
        history.push("/")
      }
    })
    return unsubscribe;
  }, [])

  const [message, setMessage] = useState("Hello User");
  useEffect(() => {
      var today = new Date();
      var time = today.getHours();
      var name = "";
      getAuth().onAuthStateChanged(function(user){
        if(user){
            name = user.displayName;
            if(time < 12){
              setMessage("Good Morning ".concat(name));
            }
            else if(time < 16){
              setMessage("Good Afternoon ".concat(name));
            }
            else{
              setMessage("Good Evening ".concat(name));
            }
        }
      })
  }, []);

  const [randomList, setRandomList] = useState([]);
  useEffect(() => {
    const URL = "https://api.spoonacular.com/recipes/random?number=4&apiKey=2db1789966f64f73a63650e15f2cdc2a";
    
    // const fetchData = async () => {
    //   try{
    //     const response = await fetch(URL,{
    //       mode: 'no-cors',
    //       method: "GET",
    //       credentials: 'include',
    //       headers: {
    //         'content-type': 'application/json'
    //       }
    //     });
    //     const restext = await response.text();
    //     const data = restext === "" ? {} : JSON.parse(restext);
    //     setRandomList(data.recipes);
    //     console.log("Home.js",data);
    //   }
    //   catch(error) {
    //     console.log("Home.js",error);
    //   }
    // }

    // fetchData();

  },[]);

  return (
    <div>
      <Header />
      <h1 className="greeting">{message}</h1>
      <div className="content">
        <h3 className="card-group">Top Picks For You</h3>
        <div className="cards">
          <RecipeCard1 image="https://source.unsplash.com/random" title="Mutter Panner" />
          <RecipeCard1 image="https://source.unsplash.com/random" title="Mutter Panner" />
          <RecipeCard1 image="https://source.unsplash.com/random" title="Mutter Panner" />
          <RecipeCard1 image="https://source.unsplash.com/random" title="Mutter Panner" />
        </div>
        <h3 className="card-group">Your Favourites</h3>
        <div className="cards">
          <RecipeCard1 image="https://source.unsplash.com/random" title="Mutter Panner" />
          <RecipeCard1 image="https://source.unsplash.com/random" title="Mutter Panner" />
          <RecipeCard1 image="https://source.unsplash.com/random" title="Mutter Panner" />
          <RecipeCard1 image="https://source.unsplash.com/random" title="Mutter Panner" />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home;
