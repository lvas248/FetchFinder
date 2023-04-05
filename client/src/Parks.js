import ParkCard from "./ParkCard"
import { useSelector } from "react-redux"
function Parks(){

    const parks = useSelector(state => state.park.entity)

    console.log(parks)

    const renderParks = parks?.map(p => {
        return <ParkCard key={p.id} park={p}/>
    })

    return (
        <div>
            {renderParks}
        </div>
    )
}
export default Parks