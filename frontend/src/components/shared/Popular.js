import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils, faStar } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import CardSkeleton from './CardSkeleton'
import env from 'react-dotenv'
import '../styles/Popular.css'

const Popular = () => {
  const [query, setQuery] = useState('salad')
  const [data, setData] = useState([])
  const [loader, setLoader] = useState(true)

  const navigate = useNavigate()

  const getFoodCategory = data
    .map((foodCategory) => foodCategory.category)
    .reduce((accumulator, foodCategory) => {
      if (!accumulator.includes(foodCategory)) {
        accumulator.push(foodCategory)
      }
      return accumulator
    }, [])

  const fetchInfo = async () => {
    try {
      return await fetch(`${env.BASE_URL}/api/dishes/popular`, {
        method: 'GET',
      })
        .then((res) => res.json())
        .then((d) => setData(Object.values(d)))
    } catch (error) {
      console.log(error)
    } finally {
      setLoader(false)
    }
  }

  useEffect(() => {
    fetchInfo()
  }, [])

  return (
    <div className='container flex-center'>
      <div className='popular-container flex-center'>
        <p>
          <FontAwesomeIcon icon={faUtensils} />
        </p>
        <h2 className='hdr-text'>
          Popular <span>{query}s</span> on Menu{' '}
        </h2>
        <div className='popular-btn flex-center'>
          {getFoodCategory.map((foodCategory) => (
            <button onClick={() => setQuery(foodCategory)} className='btn'>
              {foodCategory}
            </button>
          ))}
        </div>
        <div className='plr-container flex'>
          {loader ? (
            <CardSkeleton amount={3} />
          ) : (
            data
              .filter((item) => item.category === `${query}`)
              .map((filterdItem) => (
                <div className='plr-item-cnt'>
                  <div className='plr-price flex-center'>
                    <p>${filterdItem.price}</p>
                  </div>
                  <span className='plr-img flex-center'>
                    <img src={filterdItem.img} width={150} />
                  </span>
                  <p></p>
                  <div className='plr-rating'>
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <span>{`(${filterdItem.rating})`}</span>
                  </div>
                  <p className='plr-name'>{filterdItem.name}</p>
                  <p className='plr-desc'>{filterdItem.description}</p>
                </div>
              ))
          )}
        </div>
        <div>
          <button
            className='btn explore-btn'
            onClick={() => {
              navigate('/menu')
            }}
          >
            EXPLORE MENU
          </button>
        </div>
      </div>
    </div>
  )
}

export default Popular
