import { Label, Input, Button } from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { createVisit, removeErrors } from './features/visits/visitSlice'
import { useHistory, useParams } from 'react-router-dom'
import moment from 'moment'

function VisitForm(){

    const parks = useSelector( state => state.park.entity)
    const errors = useSelector( state => state.visit.errors)
    const dispatch = useDispatch()
    const history = useHistory()
    const params  = useParams()

    useEffect( ()=>{
        // clear errors when component dismounts
        return ()=>{
            dispatch(removeErrors())
        }
    }, [dispatch])

    const [ visit, setVisit ] = useState({
        date: moment().format('YYYY-MM-DD'),
        time: moment().format('HH:mm'),
        duration: { hours: 0, minutes: 0 },
        park_id: params.park_id || 0
    })

    const renderParkOptions = parks.map( p => {
        return <option key={p.id} value={p.id}>{p.name}</option>
    })

    function submitVisit(e){
        e.preventDefault()   
        dispatch(createVisit({
            park_id: visit.park_id,
            start_time: new Date(visit.date + 'T' + visit.time),
            duration: ( visit.duration.hours * 3600 ) + ( visit.duration.minutes * 60 )
        })).then( data => {
            if(data.meta.requestStatus === 'fulfilled'){
                history.push('/visit')
            }
        })
    }

    return (
        <form id='form' onSubmit={submitVisit}>
            Schedule a visit!

            <div className='duration'>
                <Label size='sm'>Park: </Label>
                <Input value={visit.park_id} onChange={e=>setVisit({...visit, park_id: e.target.value})} type='select'>
                    [<option value='0'>Select a park</option>, {renderParkOptions}]
                </Input>
            </div>

            { errors?.hasOwnProperty('errors') && errors.errors.park ? <p className='error left'>Park {errors.errors.park}</p> : null }

            <div className='duration'>

                <Label size='sm'>Date: </Label>
                <Input 
                    bsSize='sm'
                    type='date'
                    value={visit.date}
                    onChange={e=>setVisit({...visit, date: e.target.value})}
                    />

            </div>

            <div className='duration'>

                <Label size='sm'>Time: </Label>
                <Input 
                    bsSize='sm'
                    type='time'
                    value={visit.time}
                    onChange={e => setVisit({...visit, time: e.target.value})}
                    />

            </div>

            { errors.hasOwnProperty('errors') && errors.errors.start_time ? <p className='error left'>{errors.errors.start_time}</p> : null }

            <div >

                <Label>Estimated Duration: </Label>

                    <div className='duration'>

                        <>
                            <Label size='sm'>Hrs: </Label>
                            <Input 
                                bsSize='sm'
                                type='number'
                                value={visit.duration.hours}
                                onChange={e => setVisit({...visit, duration: {...visit.duration, hours: parseInt(e.target.value)||0}})}
                            /> 
                        </>

                        <>
                            <Label size='sm'>Min: </Label>
                            <Input 
                                bsSize='sm'
                                type='number'
                                value={visit.duration.minutes}
                                onChange={e => setVisit({...visit, duration: {...visit.duration, minutes: parseInt(e.target.value)||0}})}
                            /> 
                        </>
 
                    </div>

                    { errors.hasOwnProperty('errors') && errors.errors.duration ? <p className='error left'>Duration {errors.errors.duration}</p> : null }


            </div>

            <Button>Submit</Button>
 
            { errors.hasOwnProperty('errors') && errors.errors.conflict ? <p className='error'>{errors.errors.conflict}</p> : null }
        </form>
    )
}

export default VisitForm