import { Button, Card, CardBody, CardHeader } from 'reactstrap'
import { useDispatch } from 'react-redux'
import { deleteVisit } from './features/visits/visitSlice'
import { useState } from 'react'
import EditVisitForm from './EditVisitForm'
function VisitCard({visit}){

    const [ editBtn, setEditBtn ] = useState(false)
    const dispatch = useDispatch()

    const duration = `${visit.formatted_duration.hours} hours, ${visit.formatted_duration.minutes} minutes`
    
    function handleDelete(){
        dispatch(deleteVisit(visit.id))
    }

    function clickEditBtn(){
        setEditBtn(!editBtn)
    }

    return (
        <Card id='visitCard'> 
        {  editBtn ? (
            <EditVisitForm visit={visit} clickEditBtn={clickEditBtn}/>
            
            ):(          
            <>
                <CardHeader id={visit.upcoming ? 'commentHeader' : null } className={'left'}>{visit?.start.date}</CardHeader>
                <CardBody className='left'>
                    <h5>{visit?.park.name}</h5>
                    
                    <div className='left'>                
                        <p>Time: {visit?.start.time}</p>
                        <p>Duration: { duration }</p>
                    </div>

                    <div className={visit.upcoming ? 'right' : 'hidden'}>
                        <Button onClick={clickEditBtn} color=''>✏️</Button>
                        <Button onClick={handleDelete} color=''>🗑️</Button>
                    </div>
                    
                </CardBody>
            </>
            )            
        }


        </Card>
    )
}
export default VisitCard