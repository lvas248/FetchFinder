import { useState } from 'react'
import { Button } from 'reactstrap'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from './features/sessionSlice'
import { getUserPosition } from './features/user/userSlice'

function MobileNavBar(){

    const dispatch = useDispatch()
    const session = useSelector( state => state.session)
    const user = useSelector( state => state.user)
    const [ isOpen, setIsOpen ] =  useState(false)

    function toggle(){
        setIsOpen(!isOpen)
    }

    function logoutUser(){
        toggle()
        dispatch(logout())
    }

    function locateUser(){
        dispatch(getUserPosition())
      }

    return (
        <div id='mobileNavContainer'>
        
            <div id='mobileNav'>

                <div id='mobileTitle'><h1 className='left'>FetchFinder NYC</h1></div>

                <div id='toggle'>
                    
                    { !user.location && session.loggedIn ? <Button color='warning' id='locate' size='lg' onClick={locateUser}>📍</Button> : null } 
                    {  user.location && session.loggedIn ? (<div id='locate'>🌎</div>) : null }

                    <Button id='locate' size='lg' color='' onClick={toggle}>Ξ</Button>
                    

                </div>

            </div>

   

            <div id={ isOpen ? 'collapseMenu' : 'hide'} >
            
                    <NavLink onClick={toggle} className='navItem' to='/map' >
                        MAP
                    </NavLink>

                    <NavLink onClick={toggle} className='navItem' to='/visit'>
                        VISIT
                    </NavLink>

                    <NavLink onClick={toggle} className='navItem' to='/parks'>
                        PARKS
                    </NavLink>

                    <NavLink onClick={toggle} className='navItem' to='/profile'>
                        { session.loggedIn ? user.entity.username.toUpperCase() : 'PROFILE'}
                    </NavLink>

                    {
                        session.loggedIn ? (
                                <NavLink className='navItem' exact to='/' onClick={logoutUser}>LOGOUT</NavLink>
                            ):(

                                <NavLink className='navItem' exact to='/' onClick={toggle}>
                                    LOGIN                   
                                </NavLink>
                            )
                }
                </div>


        </div>
    )
}
export default MobileNavBar;