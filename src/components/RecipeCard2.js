import React from 'react'
import "./RecipeCard2.css"

class RecipeCard2 extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <div className="large-card" onClick={this.props.onClick}>
                <img src={this.props.recipe.image} alt="recipe-image" className="search-recipe-image" />
                <div className="search-recipe-details">
                    <h2>{this.props.recipe.title}</h2>
                    <h2>Likes: {this.props.recipe.likes}</h2>
                </div>
            </div>
        )
    }
}

export default RecipeCard2
