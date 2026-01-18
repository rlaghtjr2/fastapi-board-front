import { Routes, Route } from 'react-router-dom'
import Login from './components/auth/Login'
import AuthCallback from './components/auth/AuthCallback'
import ProtectedRoute from './components/auth/ProtectedRoute'
import PostListContainer from './components/posts/PostListContainer'
import PostDetailContainer from './components/posts/PostDetailContainer'
import PostWriteContainer from './components/posts/PostWriteContainer'
import PostEditContainer from './components/posts/PostEditContainer'
import './App.css'

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <PostListContainer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/posts/new"
          element={
            <ProtectedRoute>
              <PostWriteContainer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/posts/:postId"
          element={
            <ProtectedRoute>
              <PostDetailContainer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/posts/:postId/edit"
          element={
            <ProtectedRoute>
              <PostEditContainer />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  )
}

export default App
