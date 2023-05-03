import { Button, Card, CardBody, CardHeader } from 'reactstrap'

function VisitCard({visit}){

    return (
        <Card>
            <CardHeader className='right'>{visit?.start.date}</CardHeader>
            <CardBody className='left'>
                <h5>{visit?.park.name}</h5>
                
                <div className='left'>                
                    <p>Time: {visit?.start.time}</p>
                    <p>Duration: {visit?.end.time}</p>
                </div>

                <div className='right'>
                    <Button color=''>✏️</Button>
                    <Button color=''>🗑️</Button>
                </div>
            </CardBody>
        </Card>
    )
}
export default VisitCard