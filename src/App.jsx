import { useEffect, useState } from 'react'
import thunder from './assets/thunder.svg'
import task from './assets/task.svg'
import inbox from './assets/inbox.svg'
import inboxActive from './assets/inbox-active.svg'
import './App.css'
import Inbox from './components/Inbox'
import { getPosts, getUser } from './api/get'

function App() {
  const [className, setClassName] = useState("hide")
  const [showInbox, setShowInbox] = useState(false)
  const [posts, setPosts] = useState([])
  const handleExpand = () => {
    if (className === "hide") {
      setClassName("show")
    } else {
      setClassName("hide")
    }
  }

  const handleInbox = () => {
    if (showInbox) {
      handleExpand()
    }
    setShowInbox(!showInbox)
  }

  const handleGetPosts = () => {
    getPosts()
      .then((response) => {
        setPosts(response)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    // handleGetPosts()
  }, [])

  return (
    <div className="App">
      <div className='text-wrapper'>
        <span className='text'>SIMPLE</span>
        <span className='text'>QUICKS</span>
      </div>
      <div className='button-wrapper'>
        <div className={`action-button-container ${className}-container`}>
          <div className='act-button action-button-wrapper'>
            <span className='button-text'>Task</span>
            <div className='action-button'>
              <img src={task} />
            </div>
          </div>
          <div className='act-button action-button-wrapper' onClick={handleInbox}>
            <span className='button-text'>Inbox</span>
            <div className={`${showInbox ? 'active-inbox' : 'action-button'}`}>
              <img src={showInbox ? inboxActive : inbox} />
            </div>
          </div>
        </div>
        {!showInbox &&
          <div
            className='act-button quicks-button'
            onClick={handleExpand}
          >
            <img src={thunder} />
          </div>
        }
      </div>
      {showInbox && <Inbox data={posts} />}
    </div>
  )
}

export default App
