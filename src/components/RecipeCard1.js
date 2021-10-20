import React from 'react'
import "./RecipeCard1.css"
import { Button } from '@material-ui/core'

function RecipeCard1(props) {
    return (
        <div className="small-card" id={props.id} onClick={props.onClick}>
            <img src={props.image} className="recipe-image" alt="recipe-image"/>
            <h3 className="recipe-title">{props.title}</h3>
        </div>
    )
}

export default RecipeCard1
