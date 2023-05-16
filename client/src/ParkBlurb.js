import { Card, CardBody, CardText, CardTitle, Button, CardHeader, CardSubtitle } from 'reactstrap'
import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

function ParkBlurb({park}){

    const session = useSelector(state => state.session)
    const history = useHistory()

    function navigateToPark(){
        history.push(`/map/parkcard/${park.id}`)
    }
    function navigateToVisitForm(){
        history.push(`/visit/schedule/${park.id}`)
    }

    return (
        <Card >
            <CardBody>
                <CardHeader className='header'>
                    <CardSubtitle id='dist'><strong>🐕</strong> {park.users_at_park_now}</CardSubtitle>               
                    <CardTitle className='text-left' tag='h5'>{park?.name}</CardTitle>
                </CardHeader>
                <CardBody>
                    <CardText className='text-left' ><strong>Address: </strong> {park?.address}</CardText>
                    {/* {<CardText id='dist'>{ session.loggedIn && park?.distance_from_user ? (<strong>Distance: </strong> + park.distance_from_user + ' miles'): null}</CardText>}                 */}
                    { session.loggedIn && park?.distance_from_user ? <CardText className='left'><strong>Distance: </strong> {park.distance_from_user} miles</CardText> : null }
                </CardBody>
                <Button size='sm' onClick={navigateToPark}>See Park</Button>
                <Button size='sm' onClick={navigateToVisitForm}>Schdeule a visit</Button>
            </CardBody>

        </Card>
    )
}
export default React.memo(ParkBlurb)