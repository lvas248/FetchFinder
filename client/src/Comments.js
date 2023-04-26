import CommentCard from './CommentCard'
import CommentForm from './CommentForm'

function Comments({comments, parkId}){

    const renderComments = comments?.map( c => {
        return <CommentCard key={c.id} comment={c}/>
    })

    return (
        <div id='commentContainer'>
            <CommentForm parkId={parkId}/>
            {renderComments}

        </div>
    )
}
export default Comments