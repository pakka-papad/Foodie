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
import { Loading } from './Loading'

const Home = () => {

  const history = useHistory()
  const [recipes, setRecipes] = useState([]);

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


  async function fetchData(){
    const URL = `https://api.spoonacular.com/recipes/random?number=4&apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`;

    await axios.get(URL)
    .then(res => {
      setRecipes(res.data.recipes);
    }).catch(err => {
      console.log(err);
    })
  }

  useEffect(async() => {

    await fetchData();

  },[]);

  if(recipes.length === 0){
    return(
      <Loading />
    )
  }
  else{
    return (
      <div>
        <Header recipes={recipes} setRecipes={setRecipes}/>
        <h1 className="greeting">{message}</h1>
        <div className="content">
          <h3 className="card-group">Top Picks For You</h3>
          <div className="cards">
              {recipes.map((item, index) => {
                return (
                  <RecipeCard1 image={item.image} title={item.title} key={index} onClick={()=>{history.push(`/recipe/${item.id}`)}}/>
                )
              })}
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
}

export default Home;
