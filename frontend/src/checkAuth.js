const checkAuth = () => {
  const toek = localStorage.getItem('token')
  if (token) {
    return true
  } else {
    return false
  }
}

export default checkAuth
