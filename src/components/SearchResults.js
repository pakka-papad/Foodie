import React from 'react'
import RecipeCard2 from './RecipeCard2'
import "./SearchResults.css"
import noResults from "./resources/no-results.png"

function SearchResults(props) {

    if (props.recipes.length === 0) {
        return (
            <div className="search-results-list">
               <img src = {noResults} alt="no-results" className="no-results-img"/>
               <h3 className="no-results">Could Not Find Anything :(</h3>
            </div>
        )
    }
    else {
        return (
            <div className="search-results-list">
                {
                    props.recipes.map((item, index) => {
                        return (
                            <RecipeCard2 recipe={item} key={item.id} onClick={()=>{
                               props.history.push(`/recipe/${item.id}`);
                            }}/>
                        )
                    })
                }
            </div>
        )
    }
    
}

export default SearchResults
