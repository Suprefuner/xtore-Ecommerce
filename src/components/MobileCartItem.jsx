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

const MobileCartItem = ({ cartItem }) => {
  const { selected, id, color, size, quantity, max } = cartItem

  const {
    brand,
    price,
    originalPrice,
    name,
    images,
  } = cartItem.fields

  const [stockLevel, setStockLevel] = useState(max)
  const [isMax, setIsMax] = useState(false)
  const [count, setCount] = useState(1)
  const [touchStart, setTouchStart] = useState(0)
  const [isSwipeLeft, setIsSwipeLeft] = useState(false)
  const dispatch = useDispatch()

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].pageX)
  }

  const handleTouchMove = (e) => {
    if (touchStart - e.touches[0].pageX > 50) setIsSwipeLeft(true)
    else setIsSwipeLeft(false)
  }

  const handleChange = (e) => {
    dispatch(selectCartItem(id))
  }

  useEffect(() => {
    if (!cartItem.fields) return
    const { quantity, max } = cartItem
    setStockLevel(max)
    setIsMax(quantity === max)
    setCount(quantity)
  }, [cartItem.fields])

  useEffect(() => {
    if (!count) return
    dispatch(updateQuantity({ id, count }))
  }, [count])

  return (
    <Wrapper
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
      className={isSwipeLeft ? "left" : ""}
    >
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
          <div className="text-group">
            <div className="brand">
              <span>{brand}</span>
            </div>
            <div className="name">{name}</div>
          </div>
          <div className="text-row">
            <div>size : {size}</div>
            <div className="color">
              color : <Color fillColor={color}></Color>
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
        </div>
      </div>
      <div className="icon" onClick={() => dispatch(openModal(id))}>
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
  /* -----------------------------------*/

  display: grid;
  grid-template-columns: 3vw calc(100vw - 3vw - 5rem) 7rem;
  gap: 2rem;
  padding-block: var(--padding-block);
  transition: all 0.2s;

  &.left {
    transform: translateX(-9rem);
  }

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
    text-transform: capitalize;
    padding-right: 1rem;

    .img-container {
      width: 30%;

      img {
        height: calc(var(--height) - var(--padding-block) * 2);
      }
    }

    .info {
      display: grid;
      gap: 1rem;
    }

    .text-row {
      display: flex;
      gap: 3rem;
    }

    .brand {
      font-weight: var(--fw-semi);
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
  }

  .item-quantity {
    width: min-content;
    margin-left: -3.5rem;

    & > * {
      scale: 0.8;
    }
  }

  .item-subtotal {
    border-top: 1px solid var(--grey-100);
    padding-top: 1rem;
    margin-top: -0.5rem;
  }

  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #da0a0a;
    color: white;
    font-size: 2rem;
  }
`

const Color = styled.div`
  --size: 1.5rem;
  width: var(--size);
  height: var(--size);
  background-color: ${(props) => props.fillColor};
  border: 1px solid var(--grey-300);
  border-radius: 50%;
`

export default MobileCartItem
