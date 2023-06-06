import { Input, Button } from 'reactstrap'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux' 
import { addCommentToPark } from './features/park/parkSlice'

function CommentForm({parkId}){

    const profile_image = useSelector( state => state.user.entity.image?.url)

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

                <img alt='Prof' id='commentImage' src={profile_image ? profile_image : 'https://t3.ftcdn.net/jpg/02/95/26/46/360_F_295264675_clwKZxogAhxLS9sD163Tgkz1WMHsq1RJ.jpg'}/>
                <Input value={commentText} placeholder='comment...' onChange={handleTextChange} type='text' />
                
                <Button>Submit</Button>

            </form>
            { error.meta?.arg.park_id === parkId ? <p className='error'>Comment {error.payload.errors.comment}</p> : null }

        </>
    
    )
}
export default CommentForm