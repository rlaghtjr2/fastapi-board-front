import { useState } from 'react'
import './PostWrite.css'

function PostWrite({ onSubmit, onCancel, loading }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim() || !content.trim() || !author.trim()) {
      alert('모든 항목을 입력해주세요.')
      return
    }
    onSubmit({
      title,
      content,
      created_user: author
    })
  }

  return (
    <form className="post-write" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="author">작성자</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="작성자 이름을 입력하세요"
          disabled={loading}
        />
      </div>
      <div className="form-group">
        <label htmlFor="title">제목</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요"
          disabled={loading}
        />
      </div>
      <div className="form-group">
        <label htmlFor="content">내용</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용을 입력하세요"
          rows={10}
          disabled={loading}
        />
      </div>
      <div className="form-actions">
        <button type="button" className="cancel-button" onClick={onCancel} disabled={loading}>
          취소
        </button>
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? '저장 중...' : '작성'}
        </button>
      </div>
    </form>
  )
}

export default PostWrite
