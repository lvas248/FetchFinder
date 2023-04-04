
import { NavLink } from 'react-router-dom'
function NavBar(){

    return (
        <nav id='navbar'>
            <ul>
                    <NavLink className='navItem' to='/home'>
                        <h6>HOME</h6>
                    </NavLink>

                    <NavLink className='navItem' to='/profile'>
                        <h6>PROFILE</h6>
                    </NavLink>

                    <NavLink className='navItem' exact to='/'>
                        <h6>LOGIN</h6>                    
                    </NavLink>
            </ul>

        </nav>

    )
}
export default NavBar