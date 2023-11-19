import React, { useState, useEffect, Suspense } from 'react'
import Card from '../shared/Card'
import env from 'react-dotenv'

const MenuContainer = () => {

  const [data, setData] = useState  ([])
  const fetchApiData = async () => {
    try {
      await fetch(`${env.BASE_URL}/api/dishes`)
        .then((res) => res.json())
        .then((data) => setData(Object.values(data)))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchApiData()
  },[])

  return (
    <div className = 'menu-container'>
      {data.map((filterdItems) => <Card {...filterdItems}/>)}
    </div>
   
  )
}

export default MenuContainer