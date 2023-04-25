import { Card, CardBody, CardText, CardHeader } from 'reactstrap'


function CommentCard({comment}){
    return (
        <Card id='commentCard'>
            <CardHeader>
                <img alt='alt text' id='commentImage' src={comment.filtered_user.user_image?.url}/>
                <h6 id='commentUsername'>{comment.filtered_user?.username}</h6>
                <p id='headerText'>{comment.date}</p>
            </CardHeader>

            <CardBody>
                <CardText id='commentText'>
                    {comment.comment}
                </CardText>
            </CardBody>

        </Card>
    )
}
export default CommentCard