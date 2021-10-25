import React, {useState, useEffect} from 'react';
import { auth } from '../firebase'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router';
import RecipeHeader from './RecipeHeader';
import "./Home.css";
import "./RecipeCard1.css"
import Footer from './Footer';
import axios from 'axios';
import { Loading } from './Loading';

const RecipeDetails = () => {

  const history = useHistory()
  const { recipe_id } = useParams();
  const [info, setInfo] = useState({});

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      if (userAuth) {

      }else {
        history.push("/")
      }
    })
    return unsubscribe;
  }, [])

  async function fetchData(){
    const URL = `https://api.spoonacular.com/recipes/${recipe_id}/information?includeNutrition=true&apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`;

    await axios.get(URL)
    .then(res => {
      setInfo(res.data)
      console.log(res.data)
    }).catch(err => {
      console.log(err)
    })
  }

  useEffect(async() => {

    await fetchData();

  }, [])

  if(Object.keys(info).length === 0){
    return(
      <Loading />
    )
  }
  else{
    return (
      <div>
        <RecipeHeader recipeInfo={info}/>
        <h1 className="greeting">{info.title}</h1>
          <div className="content">
            <div style={{display:"flex", justifyContent: "space-between", alignItems:"center"}}>
              <img src={info.image} className="recipe-detail-image" alt="recipe-image" />
              <div style={{width: "100%", marginLeft: "20px", height: "100%", paddingTop: "10px"}}>
                <div style={{fontSize: "30px"}}><strong>Key Points</strong></div>
                <ul style={{paddingLeft: "18px"}}>
                  <li>
                    <div style={{fontSize: "20px"}}>Servings: {info.servings}</div>
                  </li>
                  <li>
                    <div style={{fontSize: "20px"}}>Time to cook: {info.readyInMinutes} minutes</div>
                  </li>
                  <li>
                    <div style={{fontSize: "20px"}}>Health Score: {info.healthScore}/100</div>
                  </li>
                  <li>
                    <div style={{fontSize: "20px"}}>Likes: {info.aggregateLikes}</div>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <h2 style={{marginBottom: "0px", marginTop:"30px"}}>Attributes</h2>
              <hr />
              <div>
                <h2>Steps</h2>
                <ol style={{paddingLeft: "18px"}}>
                  {info.analyzedInstructions[0].steps.map((step, index) => {
                    return(
                      <li style={{fontSize: "20px"}} key={index}>
                        {step.step}
                        <ul style={{listStyleType: "none"}}>
                        <div style={{fontSize: "18px"}}>Required ingredients</div>
                        <hr style={{marginTop: "0px", marginBottom: "0px"}}/>
                          {step.ingredients.map((ingredient, index) => {
                            return(
                              <li style={{fontSize: "18px"}} key={index}>
                                {ingredient.name}
                              </li>
                            )
                          })}
                        </ul>
                      </li>
                    )
                  })}
                </ol>
                <h2>Dish types</h2>
                <ul style={{paddingLeft: "18px"}}>
                  {info.dishTypes.map((item, index) => {
                    return (
                      <li key={index} style={{fontSize: "18px"}}>{item}</li>
                     
                    )
                  })}
                </ul>
                <h2>Exclusive ingredients</h2>
                <ul style={{paddingLeft: "18px"}}>
                  {info.extendedIngredients.map((item, index) => {
                    return (
                      <>
                      <li key={index} style={{fontSize: "18px"}}>{item.aisle}</li>
                      </>
                    )
                  })}
                </ul>
                <h3>Summary: </h3>
                <p className="summary" style={{fontSize: "18px"}} dangerouslySetInnerHTML={{__html: info.summary}}></p>
                <div>
                  <h2 style={{marginBottom: "0px"}}>For more information, please click here</h2>
                  <h3 style={{marginTop: "5px"}}><a style={{textDecoration: "none"}} target="_blank" href={info.sourceUrl}>Author Blog</a></h3>
                </div>
              </div>
            </div>
          </div>
        <Footer />
      </div>
    )
  }
}

export default RecipeDetails
