import React from 'react'
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import NotFound from  './components/NotFound';
import SignUp from './components/SignUp';
import Home from './components/Home';
import RecipeDetails from './components/RecipeDetails';
import Profile from './components/profile'

class App extends React.Component {

  render(){
    return(
      <>
        <Switch>
          <Route exact path='/' component={Login}/>
          <Route exact path='/signup' component={SignUp}/>
          <Route exact path='/home' component={Home}/>
          <Route exact path='/profile' component={Profile}/>
          <Route exact path='/recipe/:recipe_id' component={RecipeDetails} />
          <Route component={NotFound} />
        </Switch>
      </>
    );
  }

}

export default App;
