import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getPosts } from '../../api/posts'
import PostList from './PostList'
import './PostListContainer.css'

function PostListContainer() {
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        const data = await getPosts()
        setPosts(data)
      } catch (err) {
        setError('게시글을 불러오는데 실패했습니다.')
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const handleWrite = () => {
    navigate('/posts/new')
  }

  if (loading) {
    return <div className="loading">로딩 중...</div>
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  return (
    <div className="post-list-container">
      <div className="post-list-header">
        <h1>게시판</h1>
        <button className="write-button" onClick={handleWrite}>
          글쓰기
        </button>
      </div>
      <PostList posts={posts} />
    </div>
  )
}

export default PostListContainer
