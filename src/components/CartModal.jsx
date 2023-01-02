import styled from "styled-components"
import { useDispatch } from "react-redux"
import { closeModal, removeFromCart } from "../features/cart/cartSlice"

const CartModal = ({ message, cart }) => {
  const dispatch = useDispatch()

  const handleDelete = () => {
    dispatch(removeFromCart())
  }

  const handleCancel = () => {
    dispatch(closeModal())
  }

  return (
    <Wrapper>
      <p>{message}</p>
      {cart ? (
        <div className="buttons">
          <div className="btn btn--fill-black" onClick={handleDelete}>
            delete
          </div>
          <div className="btn btn--stroke" onClick={handleCancel}>
            cancel
          </div>
        </div>
      ) : null}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: clamp(50rem, 40vw, 60rem);
  padding: 5rem 8rem;
  text-align: center;
  background-color: var(--white);
  border: 1px solid var(--black);

  @media (max-width: 640px) {
    width: 90vw;
    padding: 4rem 2rem;
  }

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
