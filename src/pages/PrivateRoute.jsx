import { useSelector } from "react-redux"
import { Navigate } from "react-router"
import { Loading } from "../components"

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useSelector((store) => store.user)

  if (isLoading) {
    return (
      <div className="section-center">
        <Loading />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/" />
  }
  return children
}

export default PrivateRoute
