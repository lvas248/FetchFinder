import ParkCard from "./ParkCard"
import { useSelector } from "react-redux"
import ParkFilter from "./ParkFilter"
import { useState } from 'react'

function Parks(){

    const parks = useSelector(state => state.park.entity)
    const [ filterInput, setFilterInput ] = useState('')
    
    const filteredParks = parks.filter( p => p.name.toLowerCase().includes(filterInput.toLowerCase())) 


    const renderParks = filteredParks?.map(p => {
        return <ParkCard key={p.id} park={p}/>
    })

    function updatefilterInput(e){
        setFilterInput(e.target.value)
    }


    
    return (
        <div>
            <ParkFilter filterInput={filterInput} updatefilterInput={updatefilterInput}/>
            {renderParks}
        </div>
    )
}
export default Parks