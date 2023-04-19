import { useState } from 'react'
import { Card, CardTitle, CardSubtitle, CardBody, CardText, Button, UncontrolledCarousel } from 'reactstrap'
import MultipleImageUpload from "./MultipleImageUpload"
import { useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'

function ParkCard({ park = null }){
    const history = useHistory()
    const { parkId } = useParams()
    const parks = useSelector(state => state.park.entity)
    park = park || parks.find( p => p.id === parseInt(parkId))

    const [ addImageClick, setAddImageClick ] = useState(false)

    function clickBtn(){
        setAddImageClick(!addImageClick)
    }
    function navigateToMap(){
        history.push('/map')
    }

   const imageItems = park?.park_images?.map( i => {
        return { caption: park.name, key: i.id, src: i.url }
   })

    return (
        <Card className='parkCard'>

            <CardBody>

                <CardTitle 
                    tag='h5'
                >{park?.name}</CardTitle>

                <CardSubtitle
                    className='mb-2 text-muted'
                >{park?.borough}</CardSubtitle>

            </CardBody>

 
            <div id='carousel'>
                { park?.park_images.length > 1 ? (
                    <UncontrolledCarousel items={imageItems} />):(
                    <img
                        alt='park'
                        src={ park?.park_images.length > 0 ? park?.park_images[0].url :'http://res.cloudinary.com/dfbe9u9zm/image/upload/v1680727642/dr9lwutdvdzj1kfh5i1f.avif' }
                        className='parkImg'    
                    />
                )}
            </div>

            
            { addImageClick ? <MultipleImageUpload id={park?.id} clickBtn={clickBtn}/> : null }

            

            <CardBody>
                <div>
                    <Button size='sm' onClick={clickBtn}>{ addImageClick ? 'Cancel' : 'Add Images'}</Button>
                    <Button size='sm' color='primary' onClick={navigateToMap} >Map</Button>
                    <Button size='sm' color='success'>Schedule a visit</Button>
                </div>

                <div id='parkCardBody'>
                    <CardText><strong>ADDRESS</strong>: {park?.address}</CardText>
                    { park?.distance_from_user ? <CardText><strong>Distance: </strong>{park.distance_from_user} </CardText> : null }

                </div>
            </CardBody>
        
        </Card>
    )
}

export default ParkCard