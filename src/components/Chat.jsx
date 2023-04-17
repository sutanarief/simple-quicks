import React, { useEffect } from 'react'
import './styles/chat.css'

const Chat = ({ data, setIsOpen, getData, handleSearch, searchValue, postData }) => {


  const formatDate = (date, isRead) => {
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
    const splitedDate = date.toLocaleString('id-ID').split(', ')
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
    const month = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    const year = date.getFullYear()

    if (isRead) {
      return `${day}/${month}/${year} ${splitedDate[1].split('.')[0]}:${splitedDate[1].split('.')[1]}`
    }

    return `${months[date.getMonth()]} ${day}, ${year} ${splitedDate[1].split('.')[0]}:${splitedDate[1].split('.')[1]}`
  }

  return (
    <div className='chat-container'>

      <input placeholder='Search' value={searchValue} className='search-inbox' type='text' onChange={handleSearch} />
      {data.length > 0 && data.map((data, i) => (
        <div className='chat' style={i + 1 == data.length ? null : {
          borderBottom: '1px solid #BDBDBD'
        }} onClick={() => {
          setIsOpen(true)
          getData(data.id)
        }
        }>
          <div className='icon'>
            {/* {data.participant === 1 ? (
              <div className='icon-wrapper'>
                <div className='initial-icon'>
                  <span className='initial'>{data.lastChat.name[0]}</span>
                </div>
              </div>
            ) : ( */}
            <div className='icon-wrapper'>
              <div className='chat-icon-dark'></div>
              <div className='chat-icon'></div>
            </div>
            {/* )} */}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <div style={{ display: 'flex' }}>
              {/* <span className='chat-title'>{data.title ? data.title : data.lastChat.name}</span> */}
              <span className='chat-title'>{data.text}</span>
              {/* <span>{formatDate(new Date(data.time), data.isRead)}</span> */}
              <span>{formatDate(new Date(data.publishDate), data.isRead)}</span>
            </div>
            {/* {data.title && */}
            <span className='last-person'>{data.owner.firstName} {data.owner.lastName} :</span>
            {/* } */}
            <div className='last-chat-wrapper'>
              <span className='last-chat'>{data.text}</span>
              {!data.isRead &&
                <div className='read-sign'></div>
              }
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Chat