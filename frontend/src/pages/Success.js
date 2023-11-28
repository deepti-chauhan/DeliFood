import { useState } from "react"
import Modal from "../components/shared/Modal"
import { useNavigate } from "react-router-dom"


const Success = () => {


  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(true)
  const orderStatus = (
    <div>
      <div>
        <img src='./assets/online-shopping.gif' width='300' />
      </div>
      <h2>Order Placed</h2>
    </div>
  )

  
  const closeModal = () => {
    setShowModal(false)
    navigate('/')
  }

  return <div>
     <div className='flex-center'>
          {showModal && <Modal onClose={closeModal}>{orderStatus}</Modal>}
        </div>
  </div>
}

export default Success
