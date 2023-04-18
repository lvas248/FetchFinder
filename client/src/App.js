import './App.css';

import Signup from './Signup';
import Login from './Login';
import NavBar from './NavBar';
import Profile from './Profile'
import Parks from './Parks';
import MapComp from './MapComp';
import ParkCard from  './ParkCard'
import { useEffect } from 'react';
import { refresh } from './features/sessionSlice';
import { getParks } from './features/park/parkSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom'

function App() {

  const dispatch = useDispatch()


  useEffect(()=>{    
    dispatch(refresh())
    dispatch(getParks())
  }, [dispatch])

  const state = useSelector(state => state)
  console.log(state)

  
  return (

    <div className="App">
      <div id='navContainer'>
        <h1>Fetch Finder NYC</h1>
        <NavBar />       
      </div>

      <div >
          <Switch >

            <Route exact path='/map'>
              <MapComp />
            </Route>

            <Route path='/map/park/:parkId'>
              <ParkCard />
            </Route>

            <Route path='/parks'>
              <Parks />
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
