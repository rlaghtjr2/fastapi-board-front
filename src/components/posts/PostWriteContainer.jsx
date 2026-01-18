import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPost } from '../../api/posts'
import PostWrite from './PostWrite'
import './PostWriteContainer.css'

function PostWriteContainer() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (postData) => {
    try {
      setLoading(true)
      setError(null)
      const newPost = await createPost(postData)
      navigate(`/posts/${newPost.id}`)
    } catch (err) {
      setError('게시글 작성에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    navigate('/')
  }

  return (
    <div className="post-write-container">
      <h1>글쓰기</h1>
      {error && <div className="error">{error}</div>}
      <PostWrite
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
      />
    </div>
  )
}

export default PostWriteContainer
