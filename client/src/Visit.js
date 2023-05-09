// import VisitForm from "./VisitForm"
import VisitCard from "./VisitCard"
import VisitForm from "./VisitForm"
import { useSelector } from "react-redux"
import { Switch, Route, NavLink } from 'react-router-dom'

function Visit(){

    const visits = useSelector( state => state.visit?.entity)

    const renderAllVisits = visits?.map( v => {
        return <VisitCard key={v.id} visit={v}/>
    })


    return (
        <div id='visit'>

                <nav>
                    <ul>
                        
                        <NavLink className='visitNavItem' exact to='/visit'>
                                <h6>My Visits</h6>
                        </NavLink>

                        <NavLink className='visitNavItem' to='/visit/schedule'>
                                <h6>Schedule a visit</h6>
                        </NavLink>

                    </ul>

                </nav>

                <div id='visitShowPanel'>
                    <Switch>

                        <Route exact path='/visit/schedule/:park_id?'>
                            <VisitForm />
                        </Route>

                        <Route exact path='/visit'>
                            {renderAllVisits}
                        </Route>

                    </Switch>

                </div>

        </div>
    )
}
export default Visit