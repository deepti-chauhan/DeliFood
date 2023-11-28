import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const CardSkeleton = ({ amount }) => {
  const loadCards = Array(amount).fill(1)
  return loadCards.map((_, i) => (
    <div className='flex-center card-skeleton' key={i}>
      <div>
        <Skeleton width={180} height={250} />
      </div>
      <div>
        <Skeleton width={180} height={50} count={1} />
      </div>
    </div>
  ))
}

export default CardSkeleton
