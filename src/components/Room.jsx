import React, { useState, useEffect } from 'react'
import arrowLeft from '../assets/arrow-left.svg'
import close from '../assets/icon/navigation/close_24px.svg'
import './styles/room.css'
import ChatBubble from './ChatBubble'
import { getDetailPost, getPostComment } from '../api/get'
import { createComment } from '../api/post'

const Room = ({ data, setIsOpen, setDetailData, comments, setComment }) => {
  const [comment, setComments] = useState('')

  const formatDate = (date) => {
    const today = new Date()
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]

    const splitDate = date.split('-')

    const isSameDate = Number(splitDate[2]) == today.getDate()
    const isSameMonth = Number(splitDate[1]) == today.getMonth()
    const isSameYear = Number(splitDate[0]) == today.getFullYear()

    if (isSameDate && isSameMonth && isSameYear) {
      return `Today ${months[Number(splitDate[1] - 1)]} ${splitDate[2]}, ${splitDate[0]}`
    }

    return `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`
  }

  const handleChange = (e) => {
    setComments(e.target.value)
  }


  const handleGetData = async (id) => {
    await getDetailPost(id)
      .then((response) => {
        setDetailData(response)
      })
      .catch((err) => console.log(err))

    await getPostComment(id)
      .then((response) => {
        let newData = []
        response.data.reverse().forEach((data) => {
          if (newData.length > 0) {
            const index = newData.findIndex((x) => Object.keys(x) == data.publishDate.split('T')[0])

            if (index < 0) {
              newData.push({ [data.publishDate.split('T')[0]]: [{ ...data }] })
            } else {
              newData[index][data.publishDate.split('T')[0]].push(data)
            }
          } else {
            newData.push({ [data.publishDate.split('T')[0]]: [{ ...data }] })
          }
        })
        setComment(newData)
      })
      .catch((err) => console.log(err))
  }

  const handleClick = async () => {
    const dataPost = {
      message: comment,
      owner: import.meta.env.VITE_USER_ID,
      post: data.id
    }
    await createComment(dataPost)
      .then((response) => setComments(""))
      .catch((err) => console.log(err))

    handleGetData(data.id)
  }

  return (
    <div className='room-container'>
      <div className='room-header'>
        <img height='24px' width='24px' src={arrowLeft} style={{ cursor: 'pointer' }} onClick={() => setIsOpen(false)} />
        <div className='title-detail'>
          <span className='room-title'>{data.text}</span>
          <span className='participant'>{data.likes} Like{data.likes > 1 ? 's' : ''}</span>
        </div>
        <img height='24px' width='14px' style={{ cursor: 'pointer' }} src={close} onClick={() => setIsOpen(false)} />
      </div>
      <div className='chat-bubble-container' style={comments.length > 0 ? { display: 'flex' } : { display: 'grid' }}>
        {comments.length > 0 ? comments.map((data) => (
          <>
            <div className='date-wrapper'>
              <div className='date-line' />
              <span className='date'>
                {formatDate(Object.keys(data)[0])}
              </span>
              <div className='date-line' />
            </div>
            <div>
              {data[Object.keys(data)[0]].map((data, i) => <ChatBubble data={data} owner={data.owner.id == import.meta.env.VITE_USER_ID} index={i} />)}
            </div>
          </>
        )) :
          <div style={{ alignSelf: 'center', justifySelf: 'center' }}>No Comment</div>
        }

      </div>
      <div className='new-message-wrapper'>
        <textarea className='new-message' placeholder='Type a new message' value={comment} onChange={handleChange} />
        <button className='send-button' onClick={handleClick}>Send</button>
      </div>
    </div>
  )
}

export default Room