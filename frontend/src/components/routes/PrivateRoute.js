import { Navigate, useLocation } from 'react-router-dom'

const PrivateRoute = () => {
  const location = useLocation()
  return <Navigate to='signin' state={{from : location}} replace />
}

export default PrivateRoute
