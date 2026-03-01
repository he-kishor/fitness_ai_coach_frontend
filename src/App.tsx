import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes,  Route}from 'react-router-dom';
import IntroPage from './pages/intro';
import Playground from './pages/components';



function App() {
 

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/components" element={<Playground />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
