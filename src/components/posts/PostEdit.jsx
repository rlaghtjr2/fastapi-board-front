import { useState } from 'react'
import './PostEdit.css'

function PostEdit({ post, onSubmit, onCancel, loading }) {
  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 입력해주세요.')
      return
    }
    onSubmit({
      title,
      content
    })
  }

  return (
    <form className="post-edit" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="author">작성자</label>
        <input
          type="text"
          id="author"
          value={post.created_user}
          disabled
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
          {loading ? '저장 중...' : '수정'}
        </button>
      </div>
    </form>
  )
}

export default PostEdit
