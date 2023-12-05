import React, { useEffect, useState } from 'react'
import Footer from '../components/shared/Footer'
import Card from '../components/shared/Card'
import { FaSearch } from 'react-icons/fa'
import env from 'react-dotenv'
import CardSkeleton from '../components/shared/CardSkeleton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import { scrollToTop } from '../Util/scroll'

const Menu = () => {
  const [input, setInput] = useState('')
  const [data, setData] = useState([])
  const [category, setCategory] = useState('')
  const [loader, setLoader] = useState(true)
  const cart = useSelector((state) => state.cart)
  const token = localStorage.getItem('token')

  const fetchApiData = async () => {
    try {
      const response = await fetch(`${env.BASE_URL}/api/dishes`, {
        method: 'GET',
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`)
      }

      const data = await response.json()
      setData(Object.values(data))
    } catch (error) {
      console.error('Error fetching data:', error.message)
    } finally {
      setLoader(false)
    }
  }

  useEffect(() => {
    scrollToTop()
    fetchApiData()
  }, [])

  // filter feature //

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

    if(token) {
      foodItem = foodItem.map((fItem) => {
        const cartItem = cart.items.find(
          (cartItem) => `${cartItem.productId}` === `${fItem.productId}`
        )
        fItem['quantity'] = cartItem ? cartItem.quantity : 0
        return fItem
      })
      return foodItem
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
          <p></p>
          <h2 className='hdr-text'>
            <FontAwesomeIcon icon={faUtensils} /> Our Menu{' '}
          </h2>
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
