import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GameList from './components/GameList'

function App() {
  const [count, setCount] = useState(0)

  return (
      <GameList />
  )
}

export default App
