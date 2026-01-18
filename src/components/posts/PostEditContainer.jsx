import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getPost, updatePost } from '../../api/posts'
import PostEdit from './PostEdit'
import './PostEditContainer.css'

function PostEditContainer() {
  const { postId } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
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

    fetchPost()
  }, [postId])

  const handleSubmit = async (postData) => {
    try {
      setSaving(true)
      setError(null)
      await updatePost(postId, postData)
      navigate(`/posts/${postId}`)
    } catch (err) {
      setError('게시글 수정에 실패했습니다.')
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    navigate(`/posts/${postId}`)
  }

  if (loading) {
    return <div className="loading">로딩 중...</div>
  }

  if (error && !post) {
    return <div className="error">{error}</div>
  }

  return (
    <div className="post-edit-container">
      <h1>글 수정</h1>
      {error && <div className="error">{error}</div>}
      <PostEdit
        post={post}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={saving}
      />
    </div>
  )
}

export default PostEditContainer
