import Button from "../../ui/Button"
import { useDispatch } from "react-redux"
import { deleteItem } from "./cartSlice"

export default function DeleteItem({itemId}) {
  const dispatch = useDispatch();

  return (
    <Button type="small" onClick={() => dispatch(deleteItem(itemId))}>Delete</Button>
  )
}
