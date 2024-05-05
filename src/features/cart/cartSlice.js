import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {
  getCartFromLocalStorage,
  removeCartFromLocalStorage,
  setCartItemToLocalStorage,
} from "../../utils/localStorage"

const getInitialCartTotal = (type) => {
  return type === "items"
    ? getCartFromLocalStorage().reduce(
      (acc, { quantity }) => (acc += quantity),
      0
    )
    : getCartFromLocalStorage().reduce(
      (acc, { quantity, price }) => (acc += quantity * price),
      0
    )
}

const initialState = {
  cart: getCartFromLocalStorage(),
  totalItems: getInitialCartTotal("items"),
  totalAmount: getInitialCartTotal("amount"),
  shippingFee: 50000,
  allSelected: false,
  modal: {
    isOpen: false,
    targetItemId: "",
  },
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      const { id, color, size, quantity } = payload

      const tempProduct = state.cart.find((i) => i.id === id + color + size)

      if (tempProduct) {
        tempProduct.quantity += quantity
        if (tempProduct.quantity > tempProduct.max)
          tempProduct.quantity = tempProduct.max

        state.cart.map((cartItem) =>
          cartItem.id === tempProduct.id ? tempProduct : cartItem
        )
      } else {
        const newItem = { ...payload }
        newItem.id = newItem.id + newItem.color + newItem.size
        newItem.selected = false
        state.cart.push(newItem)
      }
    },
    removeFromCart: (state) => {
      state.cart = state.cart.filter(
        (cartItem) => cartItem.id !== state.modal.targetItemId
      )
      state.modal = initialState.modal
    },
    clearCart: (state) => {
      state.cart = []
      state.totalAmount = 0
      state.totalItems = 0
      removeCartFromLocalStorage()
    },
    selectCartItem: (state, { payload }) => {
      state.cart = state.cart.map((cartItem) =>
        cartItem.id === payload
          ? { ...cartItem, selected: !cartItem.selected }
          : cartItem
      )

      state.allSelected = state.cart
        .map((cartItem) => cartItem.selected)
        .every((selected) => selected)
    },
    selectAllCartItem: (state) => {
      state.allSelected = !state.allSelected
      state.cart = state.cart.map((cartItem) => ({
        ...cartItem,
        selected: state.allSelected,
      }))
    },
    openModal: (state, { payload }) => {
      state.modal.isOpen = true
      state.modal.targetItemId = payload
    },
    closeModal: (state) => {
      state.modal = initialState.modal
    },
    updateQuantity: (state, { payload }) => {
      const { id, count } = payload
      state.cart = state.cart.map((cartItem) =>
        cartItem.id === id ? { ...cartItem, quantity: count } : cartItem
      )
    },
    removeSelectedItem: (state) => {
      state.cart = state.cart.filter((cartItem) => cartItem.selected !== true)
      setCartItemToLocalStorage(state.cart)
    },
    countCartTotal: (state) => {
      // state.totalAmount = state.cart.reduce(
      //   (acc, { quantity, price }) => (acc += price * quantity),
      //   0
      // )
      // state.totalItem = state.cart.reduce(
      //   (acc, { quantity, price }) => (acc += price * quantity),
      //   0
      // )
      const tempObj = state.cart.reduce(
        (acc, { quantity, fields }) => {
          acc.totalAmount += fields.price * quantity
          acc.totalItems += quantity
          return acc
        },
        { totalAmount: 0, totalItems: 0 }
      )
      state.totalAmount = tempObj.totalAmount
      state.totalItems = tempObj.totalItems
    },
  },
})

export const {
  addToCart,
  clearCart,
  removeFromCart,
  selectCartItem,
  selectAllCartItem,
  openModal,
  closeModal,
  updateQuantity,
  removeSelectedItem,
  countCartTotal,
} = cartSlice.actions
export default cartSlice.reducer
