import { Input, Button } from 'reactstrap'
import { useState } from 'react'

function EditCommentTextForm({comment, clickEditBtn}){

    const [ editText, setEditText ] = useState(comment)

    function submitUpdate(e){
        e.prevent.default()
        // dispatch fetch request for update to /comments
    }

    return (
        <form onSubmit={submitUpdate}>
            <Input value={editText} onChange={e => setEditText(e.target.value)} />
            <Button color='primary' size='sm'>update</Button>
        </form>
    )
}

export default EditCommentTextForm