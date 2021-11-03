/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import "./FavouritesList.css"

function FavouritesList(props) {
    return (
        <div className="small-card-1" id={props.id} onClick={props.onClick}>
            <img src={props.image} className="recipe-image-1" alt="recipe-image"/>
            <h3 className="recipe-title-1">{props.title}</h3>
        </div>
    )
}

export default FavouritesList
