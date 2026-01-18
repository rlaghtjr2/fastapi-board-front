import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 네이버 OAuth 설정
const NAVER_CLIENT_ID = 'VI9GC_4BX7qUvytJ8rEa'
const NAVER_REDIRECT_URI = `${window.location.origin}/auth/naver/callback`

// 네이버 로그인 URL 생성
export const getNaverLoginUrl = () => {
  const state = Math.random().toString(36).substring(7)
  localStorage.setItem('oauth_state', state)

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: NAVER_CLIENT_ID,
    redirect_uri: NAVER_REDIRECT_URI,
    state: state
  })

  return `https://nid.naver.com/oauth2.0/authorize?${params.toString()}`
}

// 백엔드로 인가 코드 전달하여 로그인 처리
export const loginWithNaver = async (code, state) => {
  // state 검증
  const savedState = localStorage.getItem('oauth_state')
  if (state !== savedState) {
    throw new Error('Invalid state parameter')
  }
  localStorage.removeItem('oauth_state')

  const response = await api.get('/auth/naver/callback', {
    params: { code, state }
  })
  return response.data
}

// 로그아웃
export const logout = async () => {
  await api.post('/logout')
}

export default api
