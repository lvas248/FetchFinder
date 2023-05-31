import { Button } from 'reactstrap'

function PopupContent({selectedMarker}){

    console.log(selectedMarker)
    return (
        <div>
            <p><strong>{selectedMarker.name} </strong></p>
            <div className='flex'>
                <p>{selectedMarker.borough} { selectedMarker.distance_from_user ? ' | Dist: ' + selectedMarker?.distance_from_user : null }</p>
            </div>
            <Button size='sm'>Details</Button>
        </div>
    )
}

export default PopupContent