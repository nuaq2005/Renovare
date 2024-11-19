import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import NavBar from './components/NavBar.jsx'
import CreatePost from './pages/CreatePost.jsx'
import CreateComment from './pages/CreateComment.jsx' 
import PostDetail from './pages/PostDetail.jsx'
import EditPost from './pages/EditPost.jsx'
import EditComment from './pages/EditComment.jsx'

createRoot(document.getElementById('root')).render(
<StrictMode>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route index={true} element={<App />} />
        <Route path= "/post/:id" element={<PostDetail />} />
        <Route path="/post/:postId/create-comment" element={<CreateComment />} />
        <Route path="/edit-comment/:id" element={<EditComment />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/edit-post/:id" element={<EditPost />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
