const UserProfile = () => {
  const { username, email } = JSON.parse(localStorage.getItem('user'))
  return (
    <div>
      <form>
        <label for='username'>Name</label>
        <input
          type='text'
          name='username'
          id='username'
          value={username}
          disabled
        />
        <br/>
        <label for='email'>Email</label>
        <input type='text' name='email' id='email' value={email} disabled />
      </form>
    </div>
  )
}

export default UserProfile
