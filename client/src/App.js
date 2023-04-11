import './App.css';

import Signup from './Signup';
import Login from './Login';
import NavBar from './NavBar';
import Profile from './Profile'
import Parks from './Parks';
import Home from './Home';

import { useEffect } from 'react';
import { refresh } from './features/sessionSlice';
import { getParks } from './features/park/parkSlice';
import { setUserLocation } from './features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom'

function App() {

  const dispatch = useDispatch()

  
useEffect(()=>{
    navigator.geolocation.getCurrentPosition(p => {
        dispatch(setUserLocation({latitude: p.coords.latitude, longitude: p.coords.longitude}))})
  },[dispatch])

  useEffect(()=>{
    dispatch(refresh())
    dispatch(getParks())
  }, [dispatch])

  const state = useSelector(state => state)
  const parks = useSelector(state => state.park.entity)
  console.log(state)

  
  return (

    <div className="App">
      <div id='navContainer'>
        <h1>Fetch Finder NYC</h1>
        <NavBar />       
      </div>

      <div >
          <Switch >

            <Route path='/parks'>
              <Parks />
            </Route>

            <Route path='/home'>
              <Home />
            </Route>
            
            
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

            <Route exact path='/visit'>
            </Route>



          </Switch>
      
      </div>
    
      
    </div>
  );
}

export default App;
