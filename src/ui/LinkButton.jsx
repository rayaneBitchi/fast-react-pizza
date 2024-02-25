import {useNavigate} from "react-router-dom"
import { Link } from "react-router-dom"

export default function LinkButton({children, to}) {
  const navigate = useNavigate()
  if (to === "-1") return  <button onClick={() => navigate(-1)}>&larr; Go back</button>
  return (
    <Link to={to} className="link-button">{children}</Link>
  )
}
