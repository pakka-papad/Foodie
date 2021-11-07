import React from 'react'
import db, { auth } from '../firebase'
import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Header from './Header'
import "./Home.css"
import RecipeCard1 from './RecipeCard1'
import Footer from './Footer'
import {getAuth} from "firebase/auth"
import axios from 'axios'
import { Loading } from './Loading'
import SearchResults from './SearchResults'

const Home = () => {

  const history = useHistory()
  const [recipes, setRecipes] = useState([]);
  const [isSearched,setIsSearched] = useState(false);
  const [searchedRecipes,setSearchedRecipes] = useState([]);
  const [favourites,setFavourites] = useState([]);

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async() => {
      var today = new Date();
      var time = today.getHours();
      var name = "";
      getAuth().onAuthStateChanged(async function(user){
        if(user){
            await db.collection("users").doc(user.uid).get()
            .then(doc => {
              console.log(doc.data())
              name = doc.data().displayName;
            })
            // console.log(name)
            if(time < 12){
              setMessage("Good Morning ".concat(name));
            }
            else if(time < 16){
              setMessage("Good Afternoon ".concat(name));
            }
            else{
              setMessage("Good Evening ".concat(name));
            }


            let fav = [];
            db.collection("users").doc(user.uid).collection("favourites").get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                fav.push({
                  id: doc.id,
                  title: doc.data().title,
                  imageURL: doc.data().imageURL
                });
              });
              while(fav.length > 4) fav.pop();
              setFavourites(fav);
            })
            .catch((error) => console.log(error));
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
  else if(isSearched === true){
    return(
      <div>
        <Header searchedRecipes={searchedRecipes} setSearchedRecipes={setSearchedRecipes} isSearched={isSearched} setIsSearched={setIsSearched}/>
        <SearchResults recipes={searchedRecipes} setIsSearched={setIsSearched} history={history}/>
        <Footer />
      </div>
    )
  }
  else{
    return (
      <div>
        <Header searchedRecipes={searchedRecipes} setSearchedRecipes={setSearchedRecipes} isSearched={isSearched} setIsSearched={setIsSearched}/>
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
            {
              favourites.map((item,index) => {
                return(
                  <RecipeCard1 image={item.imageURL} title={item.title} key={index} onClick={()=>{history.push(`/recipe/${item.id}`)}}/>
                )
              })
            }
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home;
