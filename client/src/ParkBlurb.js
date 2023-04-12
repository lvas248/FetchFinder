import { Card, CardBody, CardText, CardTitle, Button, CardHeader, CardSubtitle } from 'reactstrap'
import React from 'react'
import { useSelector } from 'react-redux'
function ParkBlurb({park}){

    const session = useSelector(state => state.session)

    return (
        <Card >
            <CardBody>
                <CardHeader className='header'></CardHeader>
                <CardSubtitle id='dist'>{session.loggedIn ? park.distance_from_user : null}</CardSubtitle>
                <CardTitle className='text-left' tag='h5'>{park?.name}</CardTitle>
                <CardText className='text-left' >{park?.address}</CardText>
                <Button size='sm'>See Park details</Button>
                <Button size='sm'>Schdeule a visit</Button>
            </CardBody>

        </Card>
    )
}
export default React.memo(ParkBlurb)