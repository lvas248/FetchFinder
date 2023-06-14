import {  Button } from 'reactstrap'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'


function VisitedParks(){

    const history = useHistory()
    const visited_parks = useSelector(state => state.user?.entity?.visited_parks)
  
    function navigateToPark(e){
        history.push(`/map/parkcard/${e.target.value}`)
    }

    const renderTopParks = visited_parks?.map( p=> {
        return <Button onClick={navigateToPark} value={p.id} className='listItem' size='sm' color='' key={p.id}>{p.name}</Button>
    })

    return (
        <div id='visitedParks'>
            <h4>Previously Visited Parks</h4>
            <div id='visitedParksList'>
                {renderTopParks}
            </div>
        </div>
    )
}
export default VisitedParks