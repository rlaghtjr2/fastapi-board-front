import { useNavigate } from 'react-router-dom'
import './PostList.css'

function PostList({ posts }) {
  const navigate = useNavigate()

  if (posts.length === 0) {
    return <div className="empty-list">게시글이 없습니다.</div>
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ko-KR')
  }

  const handleClick = (postId) => {
    navigate(`/posts/${postId}`)
  }

  return (
    <div className="post-list">
      {posts.map((post) => (
        <div
          className="post-item"
          key={post.id}
          onClick={() => handleClick(post.id)}
        >
          <span className="post-id">#{post.id}</span>
          <div className="post-content">
            <div className="post-title">{post.name}</div>
            <div className="post-meta">
              <span>{post.created_user}</span>
            </div>
          </div>
          <div className="post-info">
            <span className="post-date">{formatDate(post.created_datetime)}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PostList
