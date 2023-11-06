import './UserProfile.css'
const UserProfile = () => {
  const { username, email } = JSON.parse(localStorage.getItem('user'))
  return (
    <div className='flex-center'>
      <div className='profile-wrapper flex-center'>
        <form className='profile-form'>
          <div className='flex-sb'>
            <label for='username'>Name</label>
            <input
              type='text'
              name='username'
              id='username'
              value={username}
              disabled
            />
          </div>
          <div className='flex-sb'>
            <label for='email'>Email</label>
            <input type='text' name='email' id='email' value={email} disabled />
          </div>
          <div className='flex-sb'>
            <label for='phone'>Phone </label>
            <input type='text' name='phone' id='phone'/>
          </div>
          <div className='flex-sb'>
            <label for='address'>Address</label>
            <textarea type='text' name='address' id='address'/>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserProfile
