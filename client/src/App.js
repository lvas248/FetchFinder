import './App.css';

import Signup from './Signup';
import Login from './Login';
import NavBar from './NavBar';
import Profile from './Profile'

import { useEffect } from 'react';
import { refresh } from './features/sessionSlice';
import { getParks } from './features/park/parkSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom'
function App() {

  const dispatch = useDispatch()

  const state = useSelector(state => state)
  
  console.log(state)
  
  useEffect(()=>{
    dispatch(refresh())
    dispatch(getParks())
  }, [dispatch])


  return (
    <div className="App">
      <h1>Fetch Finder NYC</h1>
      <NavBar />

      <Switch>

        <Route path='/signup'>
          <Signup />
        </Route>

        <Route exact path='/'>
          <Login />
        </Route>

        <Route path='/profile'>
          <Profile />
        </Route>

        <Route path='/signup'>
          <Signup />
        </Route>



      </Switch>
      
      
    </div>
  );
}

export default App;
