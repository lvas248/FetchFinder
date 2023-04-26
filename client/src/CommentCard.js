import { Card, CardBody, CardText, CardHeader, Button } from 'reactstrap'
import { useSelector, dispatch } from 'react-redux'

function CommentCard({comment}){

    const current_user = useSelector( state => state.user.entity.username)
    const isUserComment = (current_user === comment.filtered_user?.username)

    console.log(comment)
    function deleteComment(){

    }

    function editComment(){

    }

    return (
        <Card id='commentCard'>
            
            <CardHeader id={ isUserComment ? 'commentHeader' : null }>
                <img alt='alt text' id='commentImage' src={comment.filtered_user.user_image?.url}/>
                <h6 id='commentUsername'>{comment.filtered_user?.username}</h6>
                <p id='headerText'>{comment.date}</p>
            </CardHeader>

            <CardBody>
                <CardText id='commentText'>
                    {comment.comment}
                </CardText>
            </CardBody>

            { isUserComment ? (
                <CardBody>
                    <Button onClick={deleteComment} id='delete' color='' size='sm'>🗑️</Button>
                    <Button onClick={editComment} id='delete' color='' size='sm'>✏️</Button>
                </CardBody> 
            ) : null }
 
        </Card>
    )
}
export default CommentCard