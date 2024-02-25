// Test ID: IIDSAT
// import { useParams } from "react-router-dom";

import { useFetcher, useLoaderData } from "react-router-dom";

import { getOrder } from "../../services/apiRestaurant";

import OrderItem from "./OrderItem";

import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import { useEffect } from "react";
import UpdateOrder from "./UpdateOrder";

function Order() {
  const order = useLoaderData();
 
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.state === "idle" && !fetcher.data) {
      fetcher.load("/menu");
    }}, [fetcher]);

  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="space-y-8 px-4 py-6">
      <div className="flex flex-wrap justify-between items-center gap-2">
        <h2 className="font-semibold text-xl">Oder #{id} status</h2>

        <div className="space-x-2">
          {priority && <span className="bg-red-500 px-3 py-y rounded-full font-semibold text-red-50 text-sm uppercase tracking-wide">Priority</span>}
          <span className="bg-green-500 px-3 py-y rounded-full font-semibold text-green-50 text-sm uppercase tracking-wide">{status} order</span>
        </div>
      </div>

      <div className="flex flex-wrap justify-between items-center gap-2 bg-stone-200 px-6 py-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-stone-500 text-xs">(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

      <ul className="border-t border-b divide-y divide-stone-200">
        {cart.map((item) => (
          <OrderItem 
          key={item.pizzaId} 
          item={item}
          isLoadingIngredients={fetcher?.state === "loading"}
          ingredients={fetcher?.data?.find(el => el.id === item.pizzaId)?.ingredients ?? []} />
        ))}
      </ul>

      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="font-medium text-sm text-stone-600">Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p className="font-medium text-sm text-stone-600">Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className="font-bold">To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>
      {!priority && <UpdateOrder />}
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
