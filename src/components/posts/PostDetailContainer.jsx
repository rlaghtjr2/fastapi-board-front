import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getPost, deletePost } from '../../api/posts'
import { createComment, likeComment, dislikeComment } from '../../api/comments'
import PostDetail from './PostDetail'
import './PostDetailContainer.css'

function PostDetailContainer() {
  const { postId } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [commentLoading, setCommentLoading] = useState(false)

  const fetchPost = async () => {
    try {
      setLoading(true)
      const data = await getPost(postId)
      setPost(data)
    } catch (err) {
      setError('게시글을 불러오는데 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPost()
  }, [postId])

  const handleBack = () => {
    navigate('/')
  }

  const handleEdit = () => {
    navigate(`/posts/${postId}/edit`)
  }

  const handleDelete = async () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) {
      return
    }

    try {
      await deletePost(postId)
      navigate('/')
    } catch (err) {
      alert('삭제에 실패했습니다.')
    }
  }

  const handleCommentSubmit = async (commentData) => {
    try {
      setCommentLoading(true)
      await createComment(postId, commentData)
      await fetchPost()
    } catch (err) {
      alert('댓글 작성에 실패했습니다.')
    } finally {
      setCommentLoading(false)
    }
  }

  const handleLike = async (commentId) => {
    try {
      await likeComment(postId, commentId)
      await fetchPost()
    } catch (err) {
      alert('좋아요에 실패했습니다.')
    }
  }

  const handleDislike = async (commentId) => {
    try {
      await dislikeComment(postId, commentId)
      await fetchPost()
    } catch (err) {
      alert('싫어요에 실패했습니다.')
    }
  }

  if (loading) {
    return <div className="loading">로딩 중...</div>
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  return (
    <div className="post-detail-container">
      <div className="post-detail-actions">
        <button className="back-button" onClick={handleBack}>
          ← 목록으로
        </button>
        <div className="action-buttons">
          <button className="edit-button" onClick={handleEdit}>
            수정
          </button>
          <button className="delete-button" onClick={handleDelete}>
            삭제
          </button>
        </div>
      </div>
      <PostDetail
        post={post}
        onCommentSubmit={handleCommentSubmit}
        onLike={handleLike}
        onDislike={handleDislike}
        commentLoading={commentLoading}
      />
    </div>
  )
}

export default PostDetailContainer
