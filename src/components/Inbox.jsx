import React, { useEffect, useState } from 'react'
import './styles/inbox.css'
import Loading from './Loading'
import Chat from './Chat'
import Room from './Room'
import { getDetailPost, getPostComment, getPosts } from '../api/get'

const Inbox = () => {
  const [loading, setLoading] = useState(false)
  const [detailLoading, setDetailLoading] = useState(false)
  const [detailData, setDetailData] = useState({})
  const [comments, setComment] = useState([])
  const [searchValue, setSearchValue] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [data, setData] = useState([])


  let dummyData = [
    {
      title: "109220-Naturalization",
      lastChat: {
        name: 'Cameron Philips',
        chat: 'Please check this out'
      },
      chat: [{
        '2023-04-17T10:45:21.817':
          [
            {
              name: 'Cameron Philips',
              chat: 'hello there !',
              time: '2021-06-02T10:45:21.817',
            },
            {
              name: 'Cameron Philips',
              chat: 'I understand your initial concerns and thats very valid, Elizabeth. But you have to understand if there is a rules that you have to follow I understand your initial concerns and thats very valid, Elizabeth. But you have to understand if there is a rules that you have to follow I understand your initial concerns and thats very valid, Elizabeth. But you have to understand if there is a rules that you have to follow ',
              time: '2021-06-02T10:45:21.817',
            },
          ],
      }],
      time: '2021-01-01T19:10:21.817',
      participant: 2,
      isRead: false,
      isGroup: true,
    },
    {
      title: "Jeannette Moraima Guaman Chamba (Hutto I-589) [ Hutto Follow Up - Brief Service ]",
      lastChat: {
        name: 'Ellen',
        chat: 'Hey please read.'
      },
      time: '2021-06-02T10:45:21.817',
      participant: 2,
      isRead: true,
      isGroup: true
    },
    {
      title: "8405-Diana SALAZAR MUNGUIA",
      lastChat: {
        name: 'Cameron Philips',
        chat: 'I understand your initial concerns and thats very valid, Elizabeth. But you have to understand if there is a rules that you have to follow I understand your initial concerns and thats very valid, Elizabeth. But you have to understand if there is a rules that you have to follow I understand your initial concerns and thats very valid, Elizabeth. But you have to understand if there is a rules that you have to follow '
      },
      time: '2021-06-01T12:19:21.817',
      participant: 2,
      isRead: true,
      isGroup: true
    },
    {
      title: "",
      lastChat: {
        name: 'FastVisa Support',
        chat: 'Hey there! Welcome to your inbox.'
      },
      time: '2021-06-01T12:19:21.817',
      participant: 1,
      isRead: true,
      isGroup: false
    },
  ]

  const handleGetData = async (id) => {
    setDetailLoading(true)
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
    setDetailLoading(false)
  }

  const handleSearch = (e) => {
    if (e) {
      setSearchValue(e.target.value)
    }

    if (searchValue) {
      return data.filter((data) => data.text.toLowerCase().includes(searchValue.toLowerCase()))
    }

    return data
  }

  const newHandleGetData = async () => {
    setLoading(true)
    await getPosts()
      .then((response) => {
        setData(response.data.map((data, i) => {
          if (i === 0) {
            return { ...data, isRead: false }
          }
          return { ...data, isRead: true }
        }))
      })
      .catch((err) => console.log(err))
    setLoading(false)
  }

  useEffect(() => {
    newHandleGetData()
  }, [])

  return (
    <>
      <div className='inbox'>
        <div className='content'>
          <div className='left-content'></div>
          <div className='right-content'>
            <input className='search-input' type='text' />
            <div className='inbox-container'>
              {loading || detailLoading ? <Loading page={loading ? 'Post' : detailLoading ? 'Comments' : ""} /> :
                isOpen ? <Room setIsOpen={setIsOpen} setComment={setComment} data={detailData} comments={comments} setDetailData={setDetailData} /> :
                  <>
                    <Chat data={data} searchValue={searchValue} handleSearch={handleSearch} setIsOpen={setIsOpen} getData={handleGetData} />
                  </>
              }
            </div>
          </div>
        </div >
      </div >
    </>
  )
}

export default Inbox