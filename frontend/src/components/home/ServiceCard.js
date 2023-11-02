import React, { useEffect, useState } from 'react'
import '../home/ServiceCard.css'

const Servicecard = () => {
  const [data, setData] = useState([])

  const localApi = 'http://localhost:8080/api/services'
  const api = "https://deli-food.vercel.app/api/services"

  const fetchInfo = async () => {
    try {
      return await fetch(localApi, {
        method: 'GET',
      })
        .then((res) => res.json())
        .then((d) => setData(d))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchInfo()
  })

  return (
    <div className='container service-container flex-sa'>
      <div className='service flex'>
        {data.map((item) => (
          <div className='service-card flex-se' key={item.id}>
            <div className='service-img'>
              <img src={item.img} />
            </div>
            <div className='service-title'>
              <p key={item.id}>{item.title}</p>
            </div>
            <div className='service-info'>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Servicecard
