import { useState } from "react"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import styled from "styled-components"
import { formatPrice } from "../utils/helpers"
import CartItem from "./CartItem"
import {
  selectAllCartItem,
  clearCart,
  removeSelectedItem,
} from "../features/cart/cartSlice"

const CartContent = () => {
  const { cart, totalAmount, allSelected } = useSelector((store) => store.cart)
  const { user } = useSelector((store) => store.user)
  const dispatch = useDispatch()

  const handleChange = () => {
    dispatch(selectAllCartItem())
  }

  const handleClearCart = () => {
    dispatch(clearCart())
  }

  const handleRemoveSelectedItem = () => {
    dispatch(removeSelectedItem())
  }

  return (
    <Wrapper className="container">
      <div className="table-head">
        <span></span>
        <span>item</span>
        <span>price</span>
        <span>quantity</span>
        <span>subtotal</span>
      </div>
      <div className="table-body">
        {cart.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} checked />
        ))}
      </div>
      <div className="table-footer">
        <input
          type="checkbox"
          id="cartlist-input"
          name="cartlist-input"
          checked={allSelected}
          onChange={handleChange}
        />
        <label htmlFor="cartlist-input">all select</label>
        <button className="btn--text" onClick={handleRemoveSelectedItem}>
          delete selected item
        </button>
        <div className="buttons">
          <Link to="/products">
            <button className="btn btn--stroke">keep shopping</button>
          </Link>
          <button className="btn btn--stroke" onClick={handleClearCart}>
            clear cart
          </button>
        </div>
      </div>

      <div className="cart-total">
        <div className="cart-total-container">
          <div className="text-row">
            <span>Subtotal:</span>
            <span>{formatPrice(totalAmount)}</span>
          </div>
          <div className="text-row">
            <span>shipping fee:</span>
            <span>{formatPrice(50000)}</span>
          </div>
          <hr />
          <div className="text-row">
            <span>Order total:</span>
            <span>{formatPrice(totalAmount + 50000)}</span>
          </div>
        </div>
        <Link to={user ? "/checkout" : "/register"}>
          <button className="btn btn--fill-primary">
            {user ? "check out" : "sign in"}
          </button>
        </Link>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding-bottom: 5rem;
  .table-head {
    display: grid;

    grid-template-columns: 3vw 35rem 9rem 1fr 11rem 3vw;
    gap: 2rem;
    padding-block: 1rem;
    border-bottom: 1px solid var(--black);

    & > *:not(:nth-child(n + 2):nth-child(-n + 3)) {
      justify-self: center;
    }
  }

  .table-body {
    display: flex;
    flex-direction: column;

    & > *:not(:last-child) {
      border-bottom: 1px solid var(--grey-100);
    }
  }

  .table-footer {
    display: grid;
    grid-template-columns: 3vw max-content max-content auto;
    align-items: center;
    padding-block: 3rem 1rem;
    border-top: 1px solid var(--black);
    gap: 2rem;

    input {
      width: 1.5rem;
      justify-self: center;
    }

    .buttons {
      display: flex;
      gap: 2rem;
      margin-left: auto;
    }
  }

  .cart-total {
    width: clamp(300px, 50vw, 385px);
    margin-top: 2rem;
    margin-left: auto;

    .cart-total-container {
      padding: 3rem;

      display: grid;
      gap: 2rem;
      border: 1px solid black;
      margin-bottom: 2rem;

      .text-row {
        display: flex;
        justify-content: space-between;

        &:last-child span {
          font-size: 2rem;
          font-weight: var(--fw-semi);
        }
      }
    }

    button {
      width: 100%;
    }
  }
`

export default CartContent
