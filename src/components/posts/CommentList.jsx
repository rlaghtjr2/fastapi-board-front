import CommentWrite from './CommentWrite'
import './CommentList.css'

function CommentList({ comments, onCommentSubmit, onLike, onDislike, commentLoading }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString('ko-KR')
  }

  return (
    <div className="comment-list">
      <h3 className="comment-title">댓글 {comments?.length || 0}개</h3>
      <CommentWrite onSubmit={onCommentSubmit} loading={commentLoading} />
      {(!comments || comments.length === 0) ? (
        <div className="empty-comments">댓글이 없습니다.</div>
      ) : (
        <div className="comments">
          {comments.map((comment) => (
            <div className="comment-item" key={comment.id}>
              <div className="comment-header">
                <span className="comment-author">{comment.created_user}</span>
                <span className="comment-date">{formatDate(comment.created_datetime)}</span>
              </div>
              <div className="comment-content">{comment.content}</div>
              <div className="comment-actions">
                <button
                  className="comment-like"
                  onClick={() => onLike(comment.id)}
                >
                  👍 {comment.likes}
                </button>
                <button
                  className="comment-dislike"
                  onClick={() => onDislike(comment.id)}
                >
                  👎 {comment.dislikes}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CommentList
