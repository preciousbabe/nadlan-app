import { useAuth } from '../context/AuthContext'

export default function Dashboard() {

  const { user, logout } = useAuth()

  return (

    <div
      style={{
        minHeight: '100vh',
        background: '#0A0A0A',
        color: 'white',
        padding: '120px 40px'
      }}
    >

      <h1>
        Investor Dashboard
      </h1>

      <p>
        {user?.email}
      </p>

      <button onClick={logout}>
        Logout
      </button>

    </div>
  )
}