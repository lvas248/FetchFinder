import { useSelector } from "react-redux"
import { Card, CardTitle, CardSubtitle, CardBody, CardText, Button } from 'reactstrap'
function ParkCard({park}){
   

    return (
        <Card className='parkCard'>

            <CardBody>

                <CardTitle 
                    tag='h5'
                >{park.name}</CardTitle>

                <CardSubtitle
                    className='mb-2 text-muted'
                >{park.borough}</CardSubtitle>

            </CardBody>

            <img
                alt='park'
                src='https://images.unsplash.com/photo-1608200765700-ba7ff78b6dd0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8ZG9nJTIwcGFya3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1200&q=60'
                className='parkImg'    
            />

            <CardBody>

                <CardText><strong>ADDRESS</strong>: {park.address}</CardText>
                <Button color='primary'>See on Map</Button>
                <Button color='success'>Schedule a visit</Button>

            </CardBody>
        
            
        </Card>
    )
}

export default ParkCard