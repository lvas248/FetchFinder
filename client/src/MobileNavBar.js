import { useState } from 'react'
import { Button } from 'reactstrap'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from './features/sessionSlice'


function MobileNavBar(){

    const dispatch = useDispatch()
    const username = useSelector( state => state.user.entity.username)
    const [ isOpen, setIsOpen ] =  useState(false)

    function toggle(){
        setIsOpen(!isOpen)
    }

    function logoutUser(){
        toggle()
        dispatch(logout())
    }

    return (
        <div id='mobileNavContainer'>
        
            <div id='mobileNav'>

                <div id='mobileTitle'><h1 className='left'>FetchFinder NYC</h1></div>

                <div id='toggle'>
                    <Button id='locate' className='float-right' size='lg' onClick={toggle}>≡</Button>
                    <Button className='float-right' color='warning' size='lg'>📍</Button>
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
                        { username ? username.toUpperCase() : 'PROFILE'}
                    </NavLink>

                    {
                        username ? (
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