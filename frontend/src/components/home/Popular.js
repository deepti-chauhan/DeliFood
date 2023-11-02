import React, { useEffect, useState } from 'react'
import Card from '../shared/Card'
import '../home/Popular.css'
const Popular = () => {
  const [query, setQuery] = useState('salad')
  const [data, setData] = useState([])

  const getFoodCategory = data
    .map((foodCategory) => foodCategory.category)
    .reduce((accumulator, foodCategory) => {
      if (!accumulator.includes(foodCategory)) {
        accumulator.push(foodCategory)
      }
      return accumulator
    }, [])

   const localAPI = 'http://localhost:8080/api/dishes/popular'
   const API = "https://deli-food.vercel.app/api/dishes/popular" 

  const fetchInfo = async () => {
    try {
      return await fetch(localAPI, {
        method: 'GET',
      })
        .then((res) => res.json())
        .then((d) => setData(Object.values(d)))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchInfo()
  })

  return (
    <div className='container flex-center'>
      <div className='popular-container flex-center'>
        <h2 className='popular-hdr-text'>Popular {query} </h2>
        <div className='popular-btn flex-se'>
          {getFoodCategory.map((foodCategory) => (
            <button
              onClick={() => setQuery(foodCategory)}
              className='main-btn btn '
              
            >
              {foodCategory}
            </button>
          ))}
        </div>

        <div className='menu-container flex'>
          {data
            .filter((item) => item.category === `${query}`)
            .map((filterdItem) => (
              <Card {...filterdItem}/>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Popular
