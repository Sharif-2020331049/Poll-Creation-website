import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Poll from './pages/Poll.jsx'
import PollCreationPage from './pages/PollCreationPage.jsx'

import './App.css'
import Voted from './pages/Voted.jsx'
import Result from './pages/Result.jsx'

function App() {


  return (
    <>
    
      <Routes>
        <Route path='/' element={ <Home/> }/>
        <Route path='/poll/create' element={ <PollCreationPage/> }/>
        <Route path='/poll/:id' element={ <Poll/> }/>
        <Route path='/poll/:id/voted' element={ <Voted/> }/>
        <Route path='/poll/:id/result' element={ <Result/> }/>
     </Routes>
     
    
    </>
  )
}

export default App
