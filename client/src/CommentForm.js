import { Card, Input, Button } from 'reactstrap'
import { useState } from 'react'
import { useSelector } from 'react-redux' 

function CommentForm(){

    const profile_image = useSelector( state => state.user.entity.user_image.url)
    const [commentText, setCommentText] = useState()

    function handleTextChange(e){
        setCommentText(e.target.value)
    }

    return (
        <Card>
            <div id='formContainer'>
                <img alt='user image' id='commentImage' src={profile_image}/>
                <Input value={commentText} placeholder='comment...' onChange={handleTextChange} type='text' />
                <Button>Submit</Button>
            </div>
        </Card>
    )
}
export default CommentForm