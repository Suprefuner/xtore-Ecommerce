import { useSelector } from "react-redux"
import { Navigate } from "react-router"

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useSelector((store) => store.user)

  if (isLoading) {
    return <h3>loading...</h3>
  }

  if (!user) {
    return <Navigate to="/" />
  }
  return children
}

export default PrivateRoute
