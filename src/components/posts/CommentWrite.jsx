import { useState } from 'react'
import './CommentWrite.css'

function CommentWrite({ onSubmit, loading }) {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!content.trim() || !author.trim()) {
      alert('작성자와 내용을 입력해주세요.')
      return
    }
    onSubmit({
      content,
      created_user: author
    })
    setContent('')
  }

  return (
    <form className="comment-write" onSubmit={handleSubmit}>
      <div className="comment-write-header">
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="작성자"
          disabled={loading}
          className="author-input"
        />
      </div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="댓글을 입력하세요"
        rows={3}
        disabled={loading}
        className="content-input"
      />
      <div className="comment-write-actions">
        <button type="submit" disabled={loading || !content.trim() || !author.trim()}>
          {loading ? '작성 중...' : '댓글 작성'}
        </button>
      </div>
    </form>
  )
}

export default CommentWrite
