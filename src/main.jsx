import  {BrowserRouter, Route, Routes } from "react-router-dom"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import DetailsPage from "./components/DetailsPage.jsx"
import Page from "./components/Page.jsx"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/page" element={<Page />} />
      <Route path="/movie/:id" element={<DetailsPage />} />
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
