import React, { useEffect, useState } from 'react'
import Footer from '../components/shared/Footer'
import Card from '../components/shared/Card'
import { FaSearch } from 'react-icons/fa'
import env from 'react-dotenv'
import CardSkeleton from '../components/shared/CardSkeleton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils } from '@fortawesome/free-solid-svg-icons'

const Menu = () => {
  const [input, setInput] = useState('')
  const [data, setData] = useState([])
  const [category, setCategory] = useState('')
  const [loader, setLoader] = useState(true)

  const fetchApiData = async () => {
    try {
      const response = await fetch(`${env.BASE_URL}/api/dishes`)

      if (!response.ok) {
        // Handle non-successful responses (e.g., 404 Not Found, 500 Internal Server Error)
        throw new Error(`Failed to fetch data. Status: ${response.status}`)
      }

      const data = await response.json()
      setData(Object.values(data))
    } catch (error) {
      // Handle fetch or parsing errors
      console.error('Error fetching data:', error.message)
      // You can also show a user-friendly error message to the user if needed
    } finally {
      setLoader(false)
    }
  }

  useEffect(() => {
    fetchApiData()
  }, [])

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
        <div className='menu-header flex-center'>
          <p>
           
          </p>
          <h2 className='hdr-text'><FontAwesomeIcon icon={faUtensils} /> Our Menu </h2> 
          <div className='search-bar flex-center'>
            <div className='search-input flex-center'>
              <input
                placeholder='search your favourite cuisine...'
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <FaSearch id='input-icon' />
            </div>
          </div>
          <div className='popular-btn flex-se'>
            {getFoodCategory.map((foodCategory) => (
              <button
                key={foodCategory.id}
                onClick={() => setCategory(foodCategory)}
                className='btn '
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

            <button onClick={() => setCategory('')} className='btn'>
              All ({getFoodItems(input, '').length})
            </button>
          </div>
        </div>
        <div className='flex-center'>
          <div className='menu-container'>
            {loader ? (
              <CardSkeleton amount={10} />
            ) : (
              foodItems.map((filterItems) => (
                <Card
                  key={filterItems.productId}
                  itemKey={filterItems.productId}
                  filterItems={filterItems}
                />
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Menu
