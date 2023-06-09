import { Input, Button } from 'reactstrap'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateComment } from './features/park/parkSlice'
import { clearError } from './features/park/parkSlice'

function EditCommentTextForm({comment, clickEditBtn}){

    const [ editText, setEditText ] = useState(comment.comment)
    const errors = useSelector( state => state.park.error)
    const dispatch = useDispatch()

    useEffect( ()=>{
        // clear errors when component dismounts
        return ()=>{
            dispatch(clearError())
        }
    }, [dispatch])

    function submitUpdate(e){
        e.preventDefault()
        dispatch(updateComment({...comment, comment: editText})).then(data => {
            if(data.meta.requestStatus === 'fulfilled') clickEditBtn()     
            }
        ) 
    }

    return (
        <form onSubmit={submitUpdate}>
            <Input value={editText} onChange={e => setEditText(e.target.value)} />
            { errors.meta?.arg.id === comment.id ? <p className='error left'> Comment {errors.payload.errors.comment}</p> : null}
            <Button color='primary' size='sm'>update</Button>
        </form>
    )
}

export default EditCommentTextForm