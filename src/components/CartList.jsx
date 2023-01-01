import { useState } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import CartListItem from "./CartListItem"
import { FiChevronDown, FiChevronUp } from "react-icons/fi"

const CartList = ({ setListShow }) => {
  const [listOpen, setListOpen] = useState(true)
  const { cart } = useSelector((store) => store.cart)
  const { user } = useSelector((store) => store.user)

  const toggleList = () => setListOpen((prev) => !prev)
  const unshowList = () => setListShow(false)

  return (
    <Wrapper>
      <div className="header">
        <p>your checkout list</p>
        {!setListShow ? (
          <div className="icon" onClick={toggleList}>
            {listOpen ? <FiChevronUp /> : <FiChevronDown />}
          </div>
        ) : null}
      </div>

      {/* RENDER CART ITEMS ------------------------------- */}
      {listOpen && cart.length > 0 && (
        <div className="list">
          {cart.map((cartItem) => (
            <CartListItem key={cartItem.id} {...cartItem} />
          ))}
        </div>
      )}

      {/* IF THERE IS NO ITEM IN CART ------------------------------- */}
      {listOpen && cart.length === 0 && (
        <div className="section-center">
          <h2>Nothing in cart yet</h2>
          <Link
            to="/products"
            className="btn btn--fill-primary"
            onClick={unshowList}
          >
            go fill it
          </Link>
        </div>
      )}

      {/* RENDER BUTTONS BASE ON CONDITIONS ------------------------------- */}
      {setListShow && cart.length > 0 ? (
        <div className={`buttons ${user ? "grid-col-2" : ""}`}>
          <Link to="/cart">
            <button className={`btn btn--stroke btn-full`} onClick={unshowList}>
              cart
            </button>
          </Link>
          {user ? (
            <Link to="/checkout">
              <button
                className="btn btn--fill-primary w-50"
                onClick={unshowList}
              >
                checkout
              </button>
            </Link>
          ) : null}
        </div>
      ) : null}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  border: 1px solid black;
  align-self: flex-start;
  background-color: white;

  .header {
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .icon {
      cursor: pointer;
    }
  }

  .section-center {
    border-top: 1px solid black;
    min-height: 30rem;

    h2 {
      margin-bottom: 2rem;
    }
  }

  .list {
    max-height: 40rem;
    padding: 1rem;
    display: grid;
    gap: 1rem;

    border-top: 1px solid black;
    overflow-y: scroll;
  }

  .buttons {
    padding: 1rem;

    &.grid-col-2 {
      display: flex;
      align-items: center;
      gap: 2rem;

      & > * {
        flex-basis: 50%;
      }
    }

    button {
      width: 100%;
    }
  }
`

export default CartList
