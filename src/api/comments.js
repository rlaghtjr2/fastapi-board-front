import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 댓글 목록 조회
export const getComments = async (postId) => {
  const response = await api.get(`/posts/${postId}/comments/`)
  return response.data
}

// 댓글 생성
export const createComment = async (postId, commentData) => {
  const response = await api.post(`/posts/${postId}/comments/`, commentData)
  return response.data
}

// 댓글 수정
export const updateComment = async (postId, commentId, commentData) => {
  const response = await api.put(`/posts/${postId}/comments/${commentId}`, commentData)
  return response.data
}

// 댓글 삭제
export const deleteComment = async (postId, commentId) => {
  const response = await api.delete(`/posts/${postId}/comments/${commentId}`)
  return response.data
}

// 댓글 좋아요
export const likeComment = async (postId, commentId) => {
  const response = await api.post(`/posts/${postId}/comments/${commentId}/like`)
  return response.data
}

// 댓글 싫어요
export const dislikeComment = async (postId, commentId) => {
  const response = await api.post(`/posts/${postId}/comments/${commentId}/dislike`)
  return response.data
}

export default api
