import { Navigate } from "react-router-dom";

const AuthorizedComponent = (props) => {
  return (
    props.isLoggedIn ? props.component : <Navigate to={props.pathToRedirect} />
  )
}

export default AuthorizedComponent
