import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 게시글 목록 조회
export const getPosts = async (skip = 0, limit = 100) => {
  const response = await api.get('/posts/', {
    params: { skip, limit }
  })
  return response.data
}

// 게시글 상세 조회
export const getPost = async (postId) => {
  const response = await api.get(`/posts/${postId}`)
  return response.data
}

// 게시글 생성
export const createPost = async (postData) => {
  const response = await api.post('/posts/', postData)
  return response.data
}

// 게시글 수정
export const updatePost = async (postId, postData) => {
  const response = await api.put(`/posts/${postId}`, postData)
  return response.data
}

// 게시글 삭제
export const deletePost = async (postId) => {
  const response = await api.delete(`/posts/${postId}`)
  return response.data
}

export default api
