
import { NavLink, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from './features/sessionSlice'

function NavBar(){
    const dispatch = useDispatch()
    const username = useSelector(state => state.user.entity.username)
    const history = useHistory()

    function logoutUser(){
        dispatch(logout())
        history.push('/')
    }
    return (
        <nav id='navbar'>
            
                    <NavLink className='navItem' to='/map'>
                        MAP
                    </NavLink>

                    <NavLink className='navItem' to='/visit'>
                        VISIT
                    </NavLink>

                    <NavLink className='navItem' to='/parks'>
                        PARKS
                    </NavLink>

                    <NavLink className='navItem' to='/profile'>
                        { username ? username.toUpperCase() : 'PROFILE'}
                    </NavLink>

                    
                {
                    username ? (
                            <NavLink className='navItem' exact to='/' onClick={logoutUser}>LOGOUT</NavLink>
                         ):(

                            <NavLink className='navItem' exact to='/'>
                                LOGIN                   
                            </NavLink>
                        )
                }
 
        

        </nav>

    )
}
export default NavBar