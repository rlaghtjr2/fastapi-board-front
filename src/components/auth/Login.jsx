import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { getNaverLoginUrl } from '../../api/auth'
import './Login.css'

function Login() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  const handleNaverLogin = () => {
    window.location.href = getNaverLoginUrl()
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>게시판</h1>
        <p className="login-description">서비스를 이용하려면 로그인해주세요.</p>
        <button className="naver-login-button" onClick={handleNaverLogin}>
          <span className="naver-icon">N</span>
          네이버로 로그인
        </button>
      </div>
    </div>
  )
}

export default Login
