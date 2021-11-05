/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import "./FavouritesList.css"
import { Button } from '@mui/material';
import { withRouter } from 'react-router';

class FavouritesList extends React.Component {

    constructor(props) {
        super(props);
        // Binding method
    }

    RecipeDetail = (e) => {
        e.preventDefault();
        this.props.history.push(`/recipe/${this.props.id}`)
    }

    render(){
        return(
            <div className="small-card-1" id={this.props.id}>
                <img src={this.props.image} className="recipe-image-1" alt="recipe-image"/>
                <h3 className="recipe-title-1">{this.props.title}</h3>
                <div style={{alignSelf: "flex-end", flexDirection: "column", display: "flex", margin: "10px"}}>
                    <Button style={{alignSelf: "flex-end"}} onClick={this.RecipeDetail}>View</Button>
                    <Button style={{alignSelf: "flex-end"}} onClick={this.props.deleteFav}>Delete</Button>
                </div>
            </div>
        )
    }
}

export default withRouter(FavouritesList);
