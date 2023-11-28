// import { useState } from 'react'
import { BrowserRouter, Routes } from 'react-router-dom'
import './App.css'
import NavBar from './components/nav-bar-component/nav-bar-component'
import RenderRouter from './routers/index'

function App() {
  //const [count, setCount] = useState(0)
  return (
    <>
      <div id="app">
        <NavBar/>
        <main className="py-4">
        <BrowserRouter>
          <Routes>
            { RenderRouter() }
          </Routes>
        </BrowserRouter>
        </main>
      </div>
    </>
  )
}
export default App