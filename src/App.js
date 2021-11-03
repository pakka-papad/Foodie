import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import NotFound from  './components/NotFound';
import SignUp from './components/SignUp';
import Home from './components/Home';
import RecipeDetails from './components/RecipeDetails';
import Profile from './components/profile'
function App() {

  return (
    <>
    <Switch>
      <Route exact path='/' >
        <Login />
      </Route>
      <Route exact path='/signup' >
        <SignUp />
      </Route>
      <Route exact path='/home' >
        <Home />
      </Route>
      <Route exact path='/profile' >
        <Profile />
      </Route>
      <Route exact path='/recipe/:recipe_id' >
        <RecipeDetails />
      </Route>
      <Route component={NotFound} />
    </Switch>
  </>
  );
}

export default App;
