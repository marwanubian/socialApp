import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { TokenProvider } from './Context/tokenContext'
import { PostProvider } from './Context/postContext.jsx'  
import { CommentsProvider } from "./Context/commentsContext.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TokenProvider>
      <PostProvider>
        <CommentsProvider>
        <App />
    </CommentsProvider>
      </PostProvider>
    </TokenProvider>
  </StrictMode>,
)

