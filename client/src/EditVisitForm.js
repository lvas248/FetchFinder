import { CardHeader, CardBody, Button, Input } from "reactstrap"
import { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { editVisit, removeErrors } from './features/visits/visitSlice'
import moment from 'moment'

function EditVisitForm({visit, clickEditBtn}){

    const parks = useSelector( state => state.park.entity)
    const errors = useSelector( state => state.visit.errors)

    const [ editVisitObj, setEditVisitObj ] = useState({
        date: moment(visit.start.date).format('YYYY-MM-DD'),
        park_id: visit.park.id,
        time: moment(visit.start_time).format('HH:mm'),
        hours: parseInt(visit.formatted_duration.hours),
        minutes: parseInt(visit.formatted_duration.minutes)
    })      

    const dispatch = useDispatch()

    function updateEditVisitObj(e){
        const copy = {...editVisitObj}
        copy[e.target.name] =  e.target.value
        setEditVisitObj(copy)
    }

    const renderParkOptions = parks.map( p => {
        return <option key={p.id} value={p.id}>{p.name}</option>
    })

    function exitEditForm(){
        clickEditBtn()
        dispatch(removeErrors())
    }

    function submitVisitUpdate(e){
        e.preventDefault()
        dispatch(editVisit({
            visit_id: visit.id,
            park_id: editVisitObj.park_id,
            start_time: new Date(editVisitObj.date + 'T' + editVisitObj.time + ':00'),
            duration: editVisitObj.hours*3600 + editVisitObj.minutes*60
        })).then( data => {
            console.log(data)
            //if http request is successful, close editVisitForm
            if(data.meta.requestStatus === 'fulfilled') clickEditBtn()
        })
        // clearErrorTimeout()
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

                { errors.hasOwnProperty('errors') && errors.visit === visit.id ? <p className='error'>{errors.errors?.start_time}</p> : null }

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

                    { errors.hasOwnProperty('errors') && errors.visit === visit.id ? <p className='error'>{errors.errors?.duration}</p> : null }
          
                    <div className='right'>
                        <Button type='submit' color='' >✅</Button>
                        <Button type='button' onClick={exitEditForm} color='' size='sm'>❌</Button>
                    </div>

                    { errors.hasOwnProperty('errors') && errors.errors.conflict ? <p className='error'>{errors.errors.conflict}</p> : null }

                </div>

           


            </CardBody>
        </form>
    )
}
export default EditVisitForm