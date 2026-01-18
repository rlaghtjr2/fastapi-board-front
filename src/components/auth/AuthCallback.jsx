import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { loginWithNaver } from '../../api/auth'
import './AuthCallback.css'

function AuthCallback() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { login } = useAuth()
  const [error, setError] = useState(null)

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code')
      const state = searchParams.get('state')
      const errorParam = searchParams.get('error')

      if (errorParam) {
        setError('로그인이 취소되었습니다.')
        return
      }

      if (!code) {
        setError('인증 코드가 없습니다.')
        return
      }

      try {
        const data = await loginWithNaver(code, state)
        login(data.user)
        if (data.accessToken) {
          localStorage.setItem('accessToken', data.accessToken)
        }
        navigate('/')
      } catch (err) {
        setError('로그인 처리 중 오류가 발생했습니다.')
      }
    }

    handleCallback()
  }, [searchParams, login, navigate])

  if (error) {
    return (
      <div className="callback-container">
        <div className="callback-box">
          <div className="callback-error">{error}</div>
          <button onClick={() => navigate('/login')}>로그인 페이지로</button>
        </div>
      </div>
    )
  }

  return (
    <div className="callback-container">
      <div className="callback-box">
        <div className="callback-loading">로그인 처리 중...</div>
      </div>
    </div>
  )
}

export default AuthCallback
