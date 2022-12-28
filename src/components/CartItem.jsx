import { useState, useEffect } from "react"
import styled from "styled-components"
import { formatPrice } from "../utils/helpers"
import { QtyController } from "../components"
import { FaTrash } from "react-icons/fa"
import { useDispatch } from "react-redux"
import {
  selectCartItem,
  openModal,
  updateQuantity,
} from "../features/cart/cartSlice"

const CartItem = ({ cartItem }) => {
  const {
    brand,
    category,
    color,
    price,
    originalPrice,
    name,
    sex,
    size,
    images,
    quantity,
    max,
    selected,
    id,
  } = cartItem

  const [stockLevel, setStockLevel] = useState(max)
  const [isMax, setIsMax] = useState(quantity === max)
  const [count, setCount] = useState(quantity)
  const dispatch = useDispatch()

  const handleChange = (e) => {
    dispatch(selectCartItem(id))
  }

  useEffect(() => {
    dispatch(updateQuantity({ id, count }))
  }, [count])

  return (
    <Wrapper>
      <input
        type="checkbox"
        name="cart-item"
        checked={selected}
        onChange={handleChange}
      />
      <div className="item-detail">
        <div className="img-container">
          <img src={images[0].url} alt="product image" />
        </div>
        <div className="info">
          <div className="brand">{brand}</div>
          <div className="name">{name}</div>
          <div>size : {size}</div>
          <div className="color">
            color : <Color fillColor={color}></Color>
          </div>
        </div>
      </div>
      <div className="item-price">
        <span className="price">{formatPrice(price)}</span>
        {price !== originalPrice ? (
          <span className="text-sm">
            original price: {formatPrice(originalPrice)}
          </span>
        ) : null}
      </div>
      <div className="item-quantity">
        {
          <QtyController
            stockLevel={stockLevel}
            isMax={isMax}
            setIsMax={setIsMax}
            count={count}
            setCount={setCount}
            className="controller"
          />
        }
      </div>
      <div className="item-subtotal">{formatPrice(price * quantity)}</div>

      <div onClick={() => dispatch(openModal(id))}>
        <FaTrash />
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  /* VARIABLES -------------------------*/
  --fromTop: 2rem;
  --height: 18rem;
  --padding-block: 3rem;
  /* VARIABLES -------------------------*/

  height: var(--height);
  padding-block: var(--padding-block);

  display: grid;
  grid-template-columns: 3vw 35rem 9rem 1fr 11rem 3vw;
  align-items: center;
  gap: 2rem;

  & > *:not(:nth-child(n + 2):nth-child(-n + 3)) {
    justify-self: center;
  }

  input {
    width: 1.5rem;
    align-self: flex-start;
    justify-self: center;
    margin-top: var(--fromTop);
  }

  .item-detail {
    display: flex;
    gap: 2rem;

    .img-container {
      width: 30%;

      img {
        height: calc(var(--height) - var(--padding-block) * 2);
      }
    }

    .brand {
      font-weight: var(--fw-semi);
    }

    .name {
      margin-bottom: 1rem;
    }

    .color {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  }

  .item-price {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-top: var(--fromTop);

    .price {
      margin-bottom: 2rem;
    }
  }

  .item-quantity {
    width: min-content;
    display: flex;
    justify-content: center;

    & > * {
      scale: 0.8;
    }
  }
`

const Color = styled.div`
  --size: 1.5rem;
  width: var(--size);
  height: var(--size);
  background-color: ${(props) => props.fillColor};
  border-radius: 50%;
`

export default CartItem
