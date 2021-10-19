import React from 'react'
import "./RecipeCard1.css"

function RecipeCard1(props) {
    return (
        <div className="small-card" id={props.id}>
            <img src={props.image} className="recipe-image" alt="recipe-imahe"/>
            <h3 className="recipe-title">{props.title}</h3>
        </div>
    )
}

export default RecipeCard1
