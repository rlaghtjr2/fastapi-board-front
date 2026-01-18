import CommentList from './CommentList'
import './PostDetail.css'

function PostDetail({ post, onCommentSubmit, commentLoading }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString('ko-KR')
  }

  return (
    <div className="post-detail">
      <div className="post-card">
        <div className="post-header">
          <h1 className="post-title">{post.name}</h1>
          <div className="post-meta">
            <span className="post-author">{post.created_user}</span>
            <span className="post-date">{formatDate(post.created_datetime)}</span>
          </div>
        </div>
        <div className="post-body">
          <p>{post.content}</p>
        </div>
      </div>
      <CommentList
        comments={post.comments}
        onCommentSubmit={onCommentSubmit}
        commentLoading={commentLoading}
      />
    </div>
  )
}

export default PostDetail
