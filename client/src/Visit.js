// import VisitForm from "./VisitForm"
import VisitCard from "./VisitCard"
import VisitForm from "./VisitForm"
import { useSelector } from "react-redux"
import { Switch, Route, NavLink } from 'react-router-dom'

function Visit(){

    const visits = useSelector( state => state.user.entity.visits)

    const renderAllVisits = visits.map( v => {
        return <VisitCard key={v.id} visit={v}/>
    })

     const renderUpcomingVisits = visits.map( v =>{
        if(v.upcoming) return <VisitCard key={v.id} visit={v}/>
     })

    return (
        <div id='visit'>

                <nav>
                    <ul>
                        <NavLink className='visitNavItem' exact to='/visit'>
                                <h6>Schedule</h6>
                        </NavLink>

                        <NavLink className='visitNavItem' to='/visit/upcoming'>
                                <h6>Upcoming</h6>
                        </NavLink>

                        <NavLink className='visitNavItem' to='/visit/all'>
                                <h6>All</h6>
                        </NavLink>
                    </ul>

                </nav>

                <div id='visitShowPanel'>
                    <Switch>

                        <Route exact path='/visit'>
                            <VisitForm />
                        </Route>

                        <Route  exact path='/visit/upcoming'>
                            {renderUpcomingVisits}                          </Route>

                        <Route exact path='/visit/all'>
                            {renderAllVisits}
                        </Route>

                    </Switch>

                </div>

        </div>
    )
}
export default Visit