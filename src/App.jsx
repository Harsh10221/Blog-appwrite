import { useState } from 'react'
import config from './config/config'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className=" text-3xl font-bold underline">
      Hello world!
    </h1>
    { console.log(config.projectId) }
    </>
  )
}

export default App
