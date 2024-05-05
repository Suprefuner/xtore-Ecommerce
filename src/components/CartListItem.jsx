import React from "react"
import styled, { css } from "styled-components"
import { formatPrice } from "../utils/helpers"

const CartListItem = ({ fields }) => {
  const {
    brand,
    name,
    size,
    quantity,
    price,
    images,
  } = fields

  return (
    <Wrapper image={images[0].url}>
      <div className="img-container"></div>
      <div className="info">
        <h4>{brand}</h4>
        <span>{name}</span>
        <span>size: {size}</span>
        <span>
          color: <div className="color"></div>
        </span>
        <span>qty: {quantity}</span>
        <span>price: {formatPrice(price)}</span>
        <span>subtotal: {formatPrice(quantity * price)}</span>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  --img-container-width: 30%;

  font-size: 1.4rem;
  display: flex;
  gap: 1rem;

  .img-container {
    flex-basis: var(--img-container-width);
    width: 40%;
    background-image: url(${({ image }) => image});
    background-position: center;
    background-size: cover;
  }

  .info {
    flex-basis: calc(100% - var(--img-container-width));
    display: grid;
  }
`

export default CartListItem
