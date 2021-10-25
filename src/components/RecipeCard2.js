import React from 'react'
import "./RecipeCard2.css"

function RecipeCard2(props) {
    return (
        <div className="large-card" onClick={props.onClick}>
            <img src={props.recipe.image} alt="recipe-image" className="search-recipe-image" />
            <div className="search-recipe-details">
                <h2>{props.recipe.title}</h2>
                <h2>Likes: {props.recipe.likes}</h2>
            </div>
        </div>
    )
}

export default RecipeCard2
