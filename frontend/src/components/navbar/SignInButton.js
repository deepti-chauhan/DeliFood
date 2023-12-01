
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'

const SignInButton = () => {
  return (
    <Link to='/signin'>
      <button className='btn login-btn'>
        Login <FontAwesomeIcon icon={faRightToBracket} />
      </button>
    </Link>
  )
}

export default SignInButton
