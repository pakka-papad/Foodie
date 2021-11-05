import React from 'react'
import "./RecipeCard1.css"

class RecipeCard1 extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <div className="small-card" id={this.props.id} onClick={this.props.onClick}>
                <img src={this.props.image} className="recipe-image" alt="recipe-image"/>
                <h3 className="recipe-title">{this.props.title}</h3>
            </div>
        )
    }
}
export default RecipeCard1;
