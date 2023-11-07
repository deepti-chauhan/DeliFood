import React, { useEffect, useState, Suspense } from 'react'
import Footer from '../components/shared/Footer'
import Card from '../components/shared/Card'
import Loader from '../components/shared/Loader'
import { FaSearch } from 'react-icons/fa'
import { Shimmer, Breathing } from 'react-shimmer'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import env from 'react-dotenv'
import CardSkeleton from '../components/shared/CardSkeleton'

const Menu = () => {
  const [input, setInput] = useState('')
  const [data, setData] = useState([])
  const [category, setCategory] = useState('')
  const [loader, setLoader] = useState(true)

  const fetchApiData = async () => {
    try {
      await fetch(`${env.BASE_URL}/api/dishes`)
        .then((res) => res.json())
        .then((data) => setData(Object.values(data)))
    } catch (error) {
      console.log(error)
    } finally {
      setLoader(false)
    }
  }

  useEffect(() => {
    fetchApiData()
  },[])

  const getFoodItems = (input, category) => {
    let foodItem = data
    if (category !== '') {
      foodItem = foodItem.filter((item) => item.category === `${category}`)
    }

    if (input !== '') {
      foodItem = foodItem.filter((item) =>
        item.name.toLowerCase().trim().includes(`${input.toLowerCase().trim()}`)
      )
    }

    return foodItem
  }
  const foodItems = getFoodItems(input, category)

  const getFoodCategory = data
    .map((foodCategory) => foodCategory.category)
    .reduce((accumulator, foodCategory) => {
      if (!accumulator.includes(foodCategory)) {
        accumulator.push(foodCategory)
      }
      return accumulator
    }, [])

  return (
    <>
      <div>
        <div className='search-bar flex-center'>
          <div className='search-input flex-center'>
            <input
              placeholder='Type your search...'
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <FaSearch id='input-icon' />
          </div>
        </div>
        <div className='menu-header flex-center'>
          <h2 className='popular-hdr-text'>Popular Cuisines </h2>
          <div className='popular-btn flex-se'>
            {getFoodCategory.map((foodCategory) => (
              <button
                onClick={() => setCategory(foodCategory)}
                className='main-btn btn '
              >
                {foodCategory} (
                {getFoodItems(input, foodCategory).reduce(
                  (acc, val) =>
                    val.category === `${foodCategory}` ? acc + 1 : acc,
                  0
                )}
                )
              </button>
            ))}

            <button onClick={() => setCategory('')} className='btn main-btn'>
              All ({getFoodItems(input, '').length})
            </button>
          </div>
        </div>

        {/* <Suspense fallback={<CardSkeleton amount={10} />}>
      </Suspense> */}
        <div className='menu-container'>
          {loader ? (
            <CardSkeleton amount={10} />
          ) : (
            foodItems.map((filterItems) => <Card {...filterItems} />)
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Menu
