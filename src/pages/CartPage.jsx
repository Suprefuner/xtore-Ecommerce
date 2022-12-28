import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import styled from "styled-components"
import { PageHero, CartContent } from "../components"
import { CartModal } from "../components"
import { setCartItemToLocalStorage } from "../utils/localStorage"
import { countCartTotal } from "../features/cart/cartSlice"
import { formatPrice } from "../utils/helpers"

const CartPage = () => {
  const { cart, totalAmount, totalItem, modal } = useSelector(
    (store) => store.cart
  )
  const dispatch = useDispatch()

  useEffect(() => {
    setCartItemToLocalStorage(cart)
    dispatch(countCartTotal())
  }, [cart])

  if (cart.length < 1) {
    return (
      <EmptyWrapper className="height-100">
        <PageHero title="cart" />
        <div className="empty">
          <h2>Nothing in cart yet</h2>
          <Link to="/products" className="btn btn--fill-primary">
            go fill it
          </Link>
        </div>
      </EmptyWrapper>
    )
  }

  return (
    <Wrapper>
      <PageHero title="cart" />
      {modal.isOpen ? (
        <div className="modal">
          <CartModal />
        </div>
      ) : null}
      <CartContent />
    </Wrapper>
  )
}

const EmptyWrapper = styled.main`
  .empty {
    text-align: center;
  }
`

const Wrapper = styled.main`
  position: relative;

  .modal {
    position: absolute;
    top: 30%;
    left: 50%;
    z-index: 1000;
    transform: translate(-50%, -50%);
  }
`

export default CartPage
