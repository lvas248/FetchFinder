import { useState } from 'react'
import { Card, CardTitle, CardSubtitle, CardBody, CardText, Button, UncontrolledCarousel } from 'reactstrap'
import MultipleImageUpload from "./MultipleImageUpload"
import { useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import Comments from './Comments'

function ParkCard({ park = null }){

    const history = useHistory()
    const { parkId } = useParams()

    const parks = useSelector(state => state.park.entity)
    const session = useSelector(state => state.session)
    const loggedIn = useSelector( state => state.session.loggedIn)
    park = park || parks.find( p => p.id === parseInt(parkId))

    const [ addImageClick, setAddImageClick ] = useState(false)
    const [ showComments, setShowComments ] = useState(false)

    function clickBtn(){
        setAddImageClick(!addImageClick)
    }

    function navigateTo(endPoint){
        history.push(endPoint)
    }

    const imageItems = park?.images.map( i => {
        return { caption: park.name, key: i.id, src: i.url }
    })

    return (
        <Card id='parkCard'>

            <CardBody>

                <CardTitle 
                    tag='h5'
                >{park?.name}</CardTitle>

                <CardSubtitle
                    className='mb-2 text-muted'
                >{park?.borough}</CardSubtitle>
                {
                    loggedIn && <CardSubtitle><strong>🐕</strong> {park?.users_at_park_now}</CardSubtitle>               

                }


            </CardBody>

 
            <div id='carousel'>
                { park?.images.length > 1 ? (
                    <UncontrolledCarousel items={imageItems} />):(
                    <img
                        className='profileImage'
                        alt='park'
                        src={ park?.images.length > 0 ? park?.images[0].url :'https://res.cloudinary.com/dfbe9u9zm/image/upload/c_scale,w_400/v1686627574/park_image_xdq873.avif'}
                    />
                )}
            </div>

            <CardBody>

                <div>        

                   { session.loggedIn ? (
                    <>                         
                        <Button size='sm' color='primary' onClick={()=>navigateTo(`/map/${park.id}`)} >Map</Button>
                        <Button size='sm' onClick={clickBtn}>Add Images</Button>
                        <Button size='sm' color='success' onClick={()=>navigateTo(`/visit/schedule/${park.id}`)} >Schedule a visit</Button>
                    </>) : null }

                </div>

                { addImageClick ? <MultipleImageUpload id={park?.id} clickBtn={clickBtn}/> : null }


                <div id='parkCardBody'>
                    <CardText><strong>Address</strong>: {park?.address}</CardText>
                    { park?.distance_from_user ? <CardText><strong>Distance: </strong>{park.distance_from_user} miles</CardText> : null }

                </div>
                
            </CardBody>

                
            { session.loggedIn ? <Button size='link' color='warning' id='commentBtn' onClick={()=>setShowComments(!showComments)}>{ showComments ? 'Hide Comments' : 'Show Comments'}</Button> : null }
            
            { showComments ? <Comments comments={park?.comments} parkId={park?.id}/> : null}

        </Card>
    )
}

export default ParkCard