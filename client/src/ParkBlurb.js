import { Card, CardBody, CardText, CardTitle, Button, CardHeader, CardSubtitle } from 'reactstrap'
import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

function ParkBlurb({park}){

    const session = useSelector(state => state.session)
    const history = useHistory()

    function navigateToPark(){
        history.push(`map/park/${park.id}`)
    }

    return (
        <Card >
            <CardBody>
                <CardHeader className='header'></CardHeader>
                {<CardSubtitle id='dist'>{ session.loggedIn && park.distance_from_user ? park.distance_from_user + ' miles': null}</CardSubtitle>}                <CardTitle className='text-left' tag='h5'>{park?.name}</CardTitle>
                <CardText className='text-left' >{park?.address}</CardText>
                <Button size='sm' onClick={navigateToPark}>See Park</Button>
                <Button size='sm'>Schdeule a visit</Button>
            </CardBody>

        </Card>
    )
}
export default React.memo(ParkBlurb)