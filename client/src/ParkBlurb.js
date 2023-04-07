import { Card, CardBody, CardText, CardTitle, Button, CardHeader } from 'reactstrap'

function ParkBlurb({park}){

    return (
        <Card >
            <CardBody>
                <CardHeader className='header'></CardHeader>
                <CardTitle className='text-left' tag='h5'>{park?.name}</CardTitle>
                <CardText className='text-left' >{park?.address}</CardText>
                <Button size='sm'>See Park details</Button>
                <Button size='sm'>Schdeule a visit</Button>
            </CardBody>

        </Card>
    )
}
export default ParkBlurb