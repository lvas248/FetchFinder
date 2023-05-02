import { Input, Button } from 'reactstrap'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux' 
import { addCommentToPark } from './features/park/parkSlice'

function CommentForm({parkId}){

    const profile_image = useSelector( state => state.user.entity.user_image?.url)

    const error = useSelector( state => state.park.error)
    

    const [commentText, setCommentText] = useState('')
    const dispatch = useDispatch()

    function handleTextChange(e){
        setCommentText(e.target.value)
    }

    function submitComment(e){
        e.preventDefault()
        console.log({comment: commentText, park_id: parkId})
        dispatch(addCommentToPark({
            comment: commentText, 
            park_id: parkId
        }))
        setCommentText('')
    }


    return (
        <>            
            <form onSubmit={submitComment}
                id='formContainer'>

                <img alt='Prof' id='commentImage' src={profile_image}/>
                <Input value={commentText} placeholder='comment...' onChange={handleTextChange} type='text' />
                
                <Button>Submit</Button>

            </form>
            <p className='error'>{error}</p>

        </>
    
    )
}
export default CommentForm