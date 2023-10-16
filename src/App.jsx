import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Philosopher from './Philosopher'
import './index.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
  
    <Philosopher />

    </>
  )
}

export default App
