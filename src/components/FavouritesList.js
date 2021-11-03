/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import "./FavouritesList.css"
import { useHistory } from 'react-router';
import { Button } from '@mui/material';

function FavouritesList(props) {

    const history = useHistory();
    const RecipeDetail = (e) => {
        e.preventDefault();
        history.push(`/recipe/${props.id}`)
    }

    return (
        <div className="small-card-1" id={props.id}>
            <img src={props.image} className="recipe-image-1" alt="recipe-image"/>
            <h3 className="recipe-title-1">{props.title}</h3>
            <div style={{alignSelf: "flex-end", flexDirection: "column", display: "flex", margin: "10px"}}>
            <Button style={{alignSelf: "flex-end"}} onClick={(e) => RecipeDetail(e)}>View</Button>
            <Button style={{alignSelf: "flex-end"}} onClick={props.deleteFav}>Delete</Button>
            </div>
        </div>
    )
}

export default FavouritesList
