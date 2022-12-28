import React from "react"
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
import { closeModal, removeFromCart } from "../features/cart/cartSlice"

const CartModal = () => {
  const dispatch = useDispatch()

  const handleDelete = () => {
    dispatch(removeFromCart())
  }

  const handleCancel = () => {
    dispatch(closeModal())
  }

  return (
    <Wrapper>
      <p>Do you want to delete this item?</p>
      <div className="buttons">
        <div className="btn btn--fill-black" onClick={handleDelete}>
          delete
        </div>
        <div className="btn btn--stroke" onClick={handleCancel}>
          cancel
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 60vw;
  padding: 8rem 8rem;
  text-align: center;
  background-color: var(--white);
  border: 1px solid var(--black);

  p {
    font-size: 2rem;
    margin-bottom: 5rem;
  }

  .buttons > * {
    width: calc(50% - 2rem);

    &:not(:last-child) {
      margin-right: 2rem;
    }
  }
`

export default CartModal
