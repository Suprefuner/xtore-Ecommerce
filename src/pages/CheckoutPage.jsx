import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { PageHero, StripeCheckout } from "../components"
import { useSelector } from "react-redux"

const CheckoutPage = () => {
  const { cart } = useSelector((store) => store.cart)

  return (
    <main style={{ height: "calc(100vh - 7rem - 154px)" }}>
      <PageHero />
      <Wrapper>
        {cart.length < 1 ? (
          <div className="empty">
            <h2>You cart is empty</h2>
            <Link to="/products">fill it</Link>
          </div>
        ) : (
          <StripeCheckout />
        )}
      </Wrapper>
    </main>
  )
}

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .empty {
    text-align: center;
  }
`

export default CheckoutPage
