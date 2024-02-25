import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import { clearCart } from "./cartSlice";

import Button from "../../ui/Button";
import LinkButton from "../../ui/LinkButton";
import CartItem from "./CartItem";
import { getCart } from "./cartSlice";
import EmptyCart from "./EmptyCart";

function Cart() {
  const cart = useSelector(getCart)
  const userName = useSelector((store) => store.user.userName);
  const dispatch = useDispatch();

  if (!cart.length) {
    return (
      <EmptyCart />
    );
  }

  return (
    <div className="px-4 py-3">
      <LinkButton to='/menu' >&larr; Back to menu</LinkButton>

      <h2 className="mt-7 font-semibold text-xl">Your cart, {userName}</h2>

      <ul className="mt-3 border-b divide-y divide-stone-200">
        {cart.map((item) => (
          <CartItem key={item.pizzaId} item={item} />
        ))}
      </ul>

      <div className="space-x-2 mt-6">
        <Button type="primary" to='/order/new'>Order pizzas</Button>
        <Button type="secondary" onClick={() => dispatch(clearCart())}>Clear cart</Button>
      </div>
    </div>
  );
}

export default Cart;
