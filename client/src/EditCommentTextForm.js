import { Input, Button } from 'reactstrap'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateComment } from './features/park/parkSlice'

function EditCommentTextForm({comment, clickEditBtn}){

    const [ editText, setEditText ] = useState(comment.comment)
    const dispatch = useDispatch()

    function submitUpdate(e){
        e.preventDefault()
        dispatch(updateComment({...comment, comment: editText}))
        clickEditBtn()
        
    }

    return (
        <form onSubmit={submitUpdate}>
            <Input value={editText} onChange={e => setEditText(e.target.value)} />
            <Button color='primary' size='sm'>update</Button>
        </form>
    )
}

export default EditCommentTextForm