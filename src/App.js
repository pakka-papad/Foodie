import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import NotFound from  './components/NotFound';
import SignUp from './components/SignUp';
import Home from './components/Home';

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
      <Route component={NotFound} />
    </Switch>
  </>
  );
}

export default App;
