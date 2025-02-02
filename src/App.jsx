import { useState } from 'react'
import BackgroundPaths from './components/backgroundpath'
import ChatInput from './components/input'
import FloatingNav from './components/navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <FloatingNav/>
      <BackgroundPaths 
        title="Your Custom Title"  // Optional prop
      />
      {/* <ChatInput/> */}
      
      {/* Your existing content can stay here */}
  

    </>
  )
}

export default App