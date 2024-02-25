import { useSelector } from "react-redux";

import { formatCurrency } from "../../utils/helpers";
import DeleteItem from "./DeleteItem";
import UpdateItemQuantity from "./UpdateItemQuantity";
import { getCurrentQuantityById } from "./cartSlice";

function CartItem({ item }) {
  const {pizzaId, name, quantity, totalPrice } = item;
  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));
  

  return (
    <li className="sm:flex sm:justify-between sm:items-center py-3">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex justify-between items-center sm:gap-6">
        <p className="font-bold text-sm">{formatCurrency(totalPrice)}</p>
        <UpdateItemQuantity itemId={pizzaId} currentQuantity={currentQuantity} />
        <DeleteItem itemId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
