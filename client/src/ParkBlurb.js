import { Card, CardBody, CardText, CardTitle, Button, CardHeader, CardSubtitle } from 'reactstrap'
import { useSelector } from 'react-redux'
import * as turf from '@turf/turf'
import React from 'react'
function ParkBlurb({park}){


    const userLocation = useSelector( state => state.user.location)
    
    const parkLocation = [park.long, park.lat]
    
    
    const userLoc = [ userLocation?.longitude, userLocation?.latitude ]
    const distance = userLoc ? turf.distance(turf.point(parkLocation), turf.point(userLoc), { units: 'miles'}) : null;

    return (
        <Card >
            <CardBody>
                <CardHeader className='header'></CardHeader>
                <CardSubtitle id='dist'>{Number(distance).toFixed(2) + ' miles'}</CardSubtitle>
                <CardTitle className='text-left' tag='h5'>{park?.name}</CardTitle>
                <CardText className='text-left' >{park?.address}</CardText>
                <Button size='sm'>See Park details</Button>
                <Button size='sm'>Schdeule a visit</Button>
            </CardBody>

        </Card>
    )
}
export default React.memo(ParkBlurb)