import { Label, Input, Button } from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { createVisit } from './features/visits/visitSlice'
import { useHistory, useParams } from 'react-router-dom'

function VisitForm(){

    const parks = useSelector( state => state.park.entity)
    const dispatch = useDispatch()
    const history = useHistory()
    const params  = useParams()


    const date = Date.now()
    const now = new Date(date)

    now.setHours(now.getHours()-4)

    const [ visit, setVisit ] = useState({
        date: now.toISOString().slice(0,10),
        time: '12:00',
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
            if(data.meta.requestStatis === 'fulfilled'){
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

            </div>

            <Button>Submit</Button>
 
        </form>
    )
}

export default VisitForm