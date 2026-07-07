import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//부트스트랩을 전역으로 사용하려면 여기에 cdn선언해야 됩니다
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import App from './App.jsx'
import './scss/style.scss'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
  </StrictMode>,
)
