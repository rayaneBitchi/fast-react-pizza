import {useDispatch} from "react-redux"
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice"

import Button from "../../ui/Button"

export default function UpdateItemQuantity({itemId, currentQuantity}) {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Button type="round" onClick={() => dispatch(decreaseItemQuantity(itemId))}>-</Button>
      <span className="font-medium text-sm">{currentQuantity}</span>
      <Button type="round" onClick={() => dispatch(increaseItemQuantity(itemId))}>+</Button>
    </div>
  )
}
