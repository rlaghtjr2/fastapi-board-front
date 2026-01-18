import './CommentList.css'

function CommentList({ comments }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString('ko-KR')
  }

  if (!comments || comments.length === 0) {
    return (
      <div className="comment-list">
        <h3 className="comment-title">댓글</h3>
        <div className="empty-comments">댓글이 없습니다.</div>
      </div>
    )
  }

  return (
    <div className="comment-list">
      <h3 className="comment-title">댓글 {comments.length}개</h3>
      <div className="comments">
        {comments.map((comment) => (
          <div className="comment-item" key={comment.id}>
            <div className="comment-header">
              <span className="comment-author">{comment.created_user}</span>
              <span className="comment-date">{formatDate(comment.created_datetime)}</span>
            </div>
            <div className="comment-content">{comment.content}</div>
            <div className="comment-actions">
              <span className="comment-like">👍 {comment.likes}</span>
              <span className="comment-dislike">👎 {comment.dislikes}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CommentList
