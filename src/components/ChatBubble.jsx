import React from 'react'
import './styles/chatBubble.css'
import dotsDark from '../assets/dots-dark.svg'

const ChatBubble = ({ data, index, owner }) => {
  const formatTime = (date) => {
    const splitDate = date.toLocaleString('en-GB').split(', ')
    const getHour = splitDate[1].split(':')

    return `${getHour[0]}:${getHour[1]}`
  }
  return (
    <div className={`bubble-wrapper-${owner ? '3' : Math.ceil(Math.random(2))}`}>
      <span className={`name-color-${owner ? '3' : Math.ceil(Math.random(2))}`}>{owner ? "You" : `${data.owner.firstName} ${data.owner.lastName}`}</span>
      <div className={`chat-box-${owner ? '3' : Math.ceil(Math.random(2))}`}>
        {owner &&
          <img className='options-2' src={dotsDark} />
        }
        <div className={`chat-color-${owner ? '3' : Math.ceil(Math.random(2))}`}>
          <span className='chat-text'>{data.message}</span>
          <span className='chat-time'>{formatTime(new Date(data.publishDate))}</span>
        </div>
        {!owner &&
          <img className='options-1' src={dotsDark} />
        }
      </div>
    </div>
  )
}

export default ChatBubble