
import { NavLink, useHistory, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from './features/sessionSlice'


function NavBar(){
    const dispatch = useDispatch()
    const username = useSelector(state => state.user.entity.username)
    const history = useHistory()

    function logoutUser(){
        dispatch(logout()).then(res => console.log(res))
        history.push('/')
    }
    return (
        <nav id='navbar'>
            <ul>
                    <NavLink className='navItem' to='/home'>
                        <h6>HOME</h6>
                    </NavLink>

                    <NavLink className='navItem' to='/visit'>
                        <h6>VISIT</h6>
                    </NavLink>

                    <NavLink className='navItem' to='/map'>
                        <h6>MAP</h6>
                    </NavLink>

                    <NavLink className='navItem' to='/profile'>
                        <h6>{ username ? username.toUpperCase() : 'PROFILE'}</h6>
                    </NavLink>

                    
                {
                    username ? (
                            <Link className='navItem' to='#' onClick={logoutUser}>LOG OUT</Link>
                        // <Button color='primary' onClick={logoutUser}>LOGOUT</Button>
                         ):(

                            <NavLink className='navItem' exact to='/'>
                                <h6>LOGIN</h6>                    
                            </NavLink>
                        )
                }
 
            </ul>

        </nav>

    )
}
export default NavBar