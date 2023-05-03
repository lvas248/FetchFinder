// import VisitForm from "./VisitForm"
import VisitCard from "./VisitCard"
import { useSelector } from "react-redux"
import { Switch, Route } from 'react-router-dom'

function Visit(){

    const visits = useSelector( state => state.user.entity.visits)

    return (
        <div>
            <h2>My Visits</h2>

            <Switch>
               
                <Route exact path='/visit/upcoming'>
                    <VisitCard visit={visits[0]}/>    
                </Route>

            </Switch>


            


            {/* <VisitForm /> */}

        </div>
    )
}
export default Visit