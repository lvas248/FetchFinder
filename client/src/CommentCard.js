import { Card, CardBody, CardHeader, Button } from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux'
import { deleteComment } from './features/park/parkSlice'
import { useState } from 'react'
import EditCommentTextForm from './EditCommentTextForm'
function CommentCard({comment}){

    const current_user = useSelector( state => state.user.entity.username)
    const isUserComment = (current_user === comment.filtered_user?.username)
    const dispatch = useDispatch()

    const [ editClicked, setEditClick ] = useState(false)

    function deleteUserComment(){
        dispatch(deleteComment({
            park_id: comment.park.id,
            comment_id: comment.id
        }))
    }

    function clickEditBtn(){
        setEditClick(!editClicked)
    }

    return (
        <Card id='commentCard'>
            
            <CardHeader id={ isUserComment ? 'commentHeader' : null }>
                <img alt='alt text' id='commentImage' src={comment.filtered_user.image ? comment.filtered_user.image?.url : 'https://t3.ftcdn.net/jpg/02/95/26/46/360_F_295264675_clwKZxogAhxLS9sD163Tgkz1WMHsq1RJ.jpg'}/>
                <h6 id='commentUsername'>{comment.filtered_user?.username}</h6>
                <p id='headerText'>{comment.date}</p>
            </CardHeader>

            <CardBody>

                    {editClicked ? <EditCommentTextForm comment={comment} clickEditBtn={clickEditBtn}  /> : <p id='commentText'>{comment.comment}</p> }
                
            </CardBody>

            { isUserComment ? (
                <CardBody>
                    <Button onClick={deleteUserComment} id='delete' color='' size='sm'>🗑️</Button>
                    <Button onClick={clickEditBtn} id='delete' color='' size='sm'>✏️</Button>
                </CardBody> 
            ) : null }
 
        </Card>
    )
}
export default CommentCard