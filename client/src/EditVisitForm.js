import { CardHeader, CardBody, Button, Input } from "reactstrap"
import { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { editVisit } from './features/visits/visitSlice'

function EditVisitForm({visit, clickEditBtn}){

    const parks = useSelector( state => state.park.entity)
    const dispatch = useDispatch()

    const [ editVisitObj, setEditVisitObj ] = useState({
        date: new Date(visit.start.date).toISOString().slice(0,10),
        park_id: visit.park.id,
        time: visit.start.time.slice(0,5),
        hours: parseInt(visit.formatted_duration.hours),
        minutes: parseInt(visit.formatted_duration.minutes)
    })  
    
    function updateEditVisitObj(e){
        const copy = {...editVisitObj}
        copy[e.target.name] =  e.target.value
        setEditVisitObj(copy)
    }

    const renderParkOptions = parks.map( p => {
        return <option key={p.id} value={p.id}>{p.name}</option>
    })

    function submitVisitUpdate(e){
        e.preventDefault()
        dispatch(editVisit({
            visit_id: visit.id,
            park_id: editVisitObj.park_id,
            start_time: new Date(editVisitObj.date + 'T' + editVisitObj.time + ':00'),
            duration: editVisitObj.hours*3600 + editVisitObj.minutes*60
        }))
        

    }
    
    return (
        <form onSubmit={submitVisitUpdate}>
            <CardHeader>

            <div className='editForm'>
                    <p><strong>Date:</strong></p>
                    <Input 
                        name='date'
                        type='date'
                        value={editVisitObj.date}
                        onChange={updateEditVisitObj}
                        bsSize='sm'
                        />

                </div>
            </CardHeader>
            <CardBody>

                <div className='editForm'>
                    <p><strong>Park:</strong></p>
                    <Input
                        name='park_id'
                        type='select'
                        value={editVisitObj.park_id}
                        onChange={updateEditVisitObj}
                        bsSize='sm'
                    >
                        {renderParkOptions}
                    </Input>
                </div>

                <div className='editForm'>
                    <p><strong>Time:</strong></p>
                    <Input
                        name='time'
                        type='time'
                        value={editVisitObj.time}
                        onChange={updateEditVisitObj}
                        bsSize='sm'
                    />
                </div>

                <div>

                    <p className='left'><strong>Duration:</strong></p>

                    <div className='editForm'>
                        <p>Hrs:</p>
                        <Input
                            name='hours'
                            type='hour'
                            value={editVisitObj.hours}
                            onChange={updateEditVisitObj}
                            bsSize='sm'
                        />
                        <p>Mins:</p>
                        <Input
                            name='minutes'
                            type='minute'
                            value={editVisitObj.minutes}
                            onChange={updateEditVisitObj}
                            bsSize='sm'
                        />

                    </div>
                    <div className='right'>
                        <Button type='submit' color='' >✅</Button>
                        <Button type='button' onClick={clickEditBtn}color='' size='sm'>❌</Button>
                    </div>
                </div>

           


            </CardBody>
        </form>
    )
}
export default EditVisitForm