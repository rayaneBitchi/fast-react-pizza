import {useSelector} from "react-redux";

export default function Username() {
  const userName = useSelector((store) => store.user.userName);
  if(!userName) return null;
  return (
    <div className="md:block hidden font-semibold text-sm">{userName}</div> 
  )
}
