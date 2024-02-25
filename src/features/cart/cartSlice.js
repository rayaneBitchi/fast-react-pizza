import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cart: [],
  // cart: [
  //   {
  //     pizzaId: 1,
  //     name: 'Pizza Margherita',
  //     unitPrice: 10,
  //     quantity: 1,
  //     totalPrice: 10
  //   }
  // ],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload)
    },
    increaseItemQuantity(state, action) {
      let item = state.cart.find(
        (item) => item.pizzaId === action.payload
      )
      item.quantity++
      item.totalPrice = item.unitPrice * item.quantity
    },
    decreaseItemQuantity(state, action) {
      let item = state.cart.find(
        (item) => item.pizzaId === action.payload
      )
      item.quantity--
      item.totalPrice = item.unitPrice * item.quantity

      // Remove item if quantity is 0
      // this is eqaul to if (item.quantity === 0) deleteItem(state, action)
      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action)
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter(
        (item) => item.pizzaId !== action.payload
      )
    },
    clearCart(state) {
      state.cart = []
    },
  },  
})

export const { addItem, clearCart, decreaseItemQuantity, deleteItem, increaseItemQuantity } = cartSlice.actions
export default cartSlice.reducer

export const getCart = (state) => state.cart.cart

export const getTotalCartQuantity = (state) => state.cart.cart.reduce((sum, item) => sum + item.quantity, 0)
export const getTotalCartPrice = (state) => state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0)

export const getCurrentQuantityById = id => state => state.cart.cart.find(item => item.pizzaId === id)?.quantity ?? 0