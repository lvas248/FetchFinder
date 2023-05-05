import { Button, Card, CardBody, CardHeader } from 'reactstrap'
import { useDispatch } from 'react-redux'
import { deleteVisit } from './features/visits/visitSlice'

function VisitCard({visit}){

    const dispatch = useDispatch()

    function handleDelete(){
        dispatch(deleteVisit(visit.id)).then(res => {
            if(res.ok) console.log('yes')
            else console.log('no')
        })
    }

    return (
        <Card>
            <CardHeader id={visit.upcoming ? 'commentHeader' : null } className={'left'}>{visit?.start.date}</CardHeader>
            <CardBody className='left'>
                <h5>{visit?.park.name}</h5>
                
                <div className='left'>                
                    <p>Time: {visit?.start.time}</p>
                    <p>Duration: {visit?.end.time}</p>
                </div>

                <div className={visit.upcoming ? 'right' : 'hidden'}>
                    <Button color=''>✏️</Button>
                    <Button onClick={handleDelete} color=''>🗑️</Button>
                </div>
                
            </CardBody>
        </Card>
    )
}
export default VisitCard