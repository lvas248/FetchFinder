import './App.css';

import Signup from './Signup';
import Login from './Login';
import NavBar from './NavBar';
import Profile from './Profile'
import Parks from './Parks';
import MapComp from './MapComp';
import ParkCard from  './ParkCard'
import Visit from './Visit';
import { useEffect } from 'react';
import { refresh } from './features/sessionSlice';
import { getParks } from './features/park/parkSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom'
import { Button } from 'reactstrap';
import { getUserPosition } from './features/user/userSlice';

function App() {

  const dispatch = useDispatch()

  useEffect(()=>{    
    dispatch(refresh())
    dispatch(getParks())
  }, [dispatch])

  const state = useSelector( state => state)
  const user = useSelector( state => state.user)
  
  const session = useSelector( state => state.session)

  console.log(state)

  function locateUser(){
    dispatch(getUserPosition())
  }
  
  return (

    <div className="App">

      <div id='navContainer'>

        <div id='title'>
          <h2>Fetch Finder NYC</h2>        
        </div>
       
        <NavBar /> 

        <div id='locateContainer'>
          { !user.location && session.loggedIn ? <Button color='warning' onClick={locateUser}>📍</Button> : <Button color='success'>🌎</Button> } 
        </div>
 
      </div>

      <div >
          <Switch >

            <Route exact path='/map/:parkId?'>
              <MapComp />
            </Route>

            <Route path='/map/parkcard/:parkId'>
              <ParkCard />
            </Route>

            <Route path='/visit'>
              { session.loggedIn ? <Visit /> : 'Login or Signup to access this feature'}
            </Route>

            <Route path='/parks'>
              <Parks />
            </Route>
            
            <Route path='/profile'>
              { session.loggedIn ? <Profile /> : 'Login or signup to access Feature'}
            </Route>

            <Route exact path='/'>
              <Login />
            </Route>

            <Route path='/signup'>
              <Signup />
            </Route>

    
          </Switch>
      
      </div>
    
      
    </div>
  );
}

export default App;
