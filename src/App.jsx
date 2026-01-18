import { Routes, Route } from 'react-router-dom'
import PostListContainer from './components/posts/PostListContainer'
import PostDetailContainer from './components/posts/PostDetailContainer'
import PostWriteContainer from './components/posts/PostWriteContainer'
import PostEditContainer from './components/posts/PostEditContainer'
import './App.css'

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<PostListContainer />} />
        <Route path="/posts/new" element={<PostWriteContainer />} />
        <Route path="/posts/:postId" element={<PostDetailContainer />} />
        <Route path="/posts/:postId/edit" element={<PostEditContainer />} />
      </Routes>
    </div>
  )
}

export default App
