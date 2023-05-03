import './App.css';

import Signup from './Signup';
import Login from './Login';
import NavBar from './NavBar';
import Profile from './Profile'
import Parks from './Parks';
import MapComp from './MapComp';
import ParkCard from  './ParkCard'
import Visit from './Visit';
import VisitCard from './VisitCard';
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

  const user = useSelector( state => state.user)
  const session = useSelector( state => state.session)
  // const parks = useSelector( state => state.park)

  console.log('user: ',user)

  function locateUser(){
    dispatch(getUserPosition())
  }
  
  return (

    <div className="App">
      <div id='navContainer'>

        { !user.location && session.loggedIn ? <Button id='locate' color='warning' onClick={locateUser}>📍</Button> : null } 
        
        <h1>Fetch Finder NYC</h1>        
        <NavBar />       
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
              <Visit />     
            </Route>

  

  
            <Route path='/parks'>
              <Parks />
            </Route>
            
            <Route path='/profile'>
              <Profile />
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
