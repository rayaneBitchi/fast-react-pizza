import { useState } from "react";
import {useSelector, useDispatch} from "react-redux";
import store from "../../store";

import { Form, redirect, useNavigation, useActionData } from "react-router-dom";
import Button from "../../ui/Button";
import { createOrder } from "../../services/apiRestaurant" ;
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );


function CreateOrder() {

  const dispatch = useDispatch();

  const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const {userName, status: addressStatus, position, address, error: errorAddress} = useSelector((store) => store.user);

  const isLoadingAddress = addressStatus === "loading";


  const formErrors = useActionData();

  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice)
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  if(!cart.length) return <EmptyCart />

  return (
    <div className="px-6 py-4">
      <h2 className="mb-8 font-semibold text-xl">Ready to order? Let&apos;s go!</h2>

      <Form method='POST'>
        <div className="flex sm:flex-row flex-col sm:items-center gap-2 mb-5">
          <label className="block after:content-['*'] after:ml-0.5 after:text-red-500 sm:basis-40">First Name</label>
          <input type='text' name='customer' defaultValue={userName} className="grow input" required />
        </div>

        <div className="flex sm:flex-row flex-col sm:items-center gap-2 mb-5">
          <label className="block after:content-['*'] after:ml-0.5 after:text-red-500 sm:basis-40 self-start">Phone number</label>
          <div className="grow">
            <input type='tel' name='phone' className="w-full input" required />
             {formErrors?.phone && <p className="bg-red-100 mt-2 p-2 rounded-md text-red-700 text-xs">{formErrors.phone}</p>}
          </div>
         
        </div>

        <div className="relative flex sm:flex-row flex-col sm:items-center gap-2 mb-5">
          <label className="block after:content-['*'] after:ml-0.5 after:text-red-500 sm:basis-40 self-start">Address</label>
          <div  className="grow">
            <input type='text' name='address' className="w-full input" disabled={isLoadingAddress} defaultValue={address} required />
            {addressStatus === 'error' && <p className="bg-red-100 mt-2 p-2 rounded-md text-red-700 text-xs">{errorAddress}</p>}
          </div>
          {!position.latitude && !position.longitude ? <span className="top-[2.05rem] sm:top-[1px] right-[2px] sm:right-[2px] z-50 sm:z-50 absolute"><Button type="small" disabled={isLoadingAddress} onClick={(e) => {
            e.preventDefault(); 
            dispatch(fetchAddress())}}>Get Position</Button></span> : null}
        </div>

        <div className="flex items-center gap-5 mb-12">
          <input
            type='checkbox'
            name='priority'
            id='priority'
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
            className="accent-yellow-400 w-6 h-6 focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 focus:outline-none transition duration-150 ease-in-out"
          />
          <label htmlFor='priority' className="font-medium">Want to yo give your order priority?</label>
        </div>

        <input type="hidden" name="position" value={position.longitude && position.latitude ? `${position.latitude},${position.longitude}` : ''} />

        <div>
          <input type='hidden' name='cart' value={JSON.stringify(cart)} />
          <Button type="primary" disabled={isSubmitting || isLoadingAddress}>
            {isSubmitting ? "Placing order" : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

// This function is called when the form is submitted

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };

  const errors = {};

  if (!isValidPhone(order.phone)) {
    errors.phone = "Please enter a valid phone number";
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }

  const newOrder = await createOrder(order);

  // Not overusing the store here, but it's a good place to clear the cart
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
