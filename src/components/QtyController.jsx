import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { FiMinus, FiPlus } from "react-icons/fi"

const QtyController = ({ stockLevel, isMax, setIsMax, count, setCount }) => {
  const soldOut = stockLevel === 0

  useEffect(() => {
    count === stockLevel ? setIsMax(true) : setIsMax(false)
    if (count > stockLevel) setCount(stockLevel)
  }, [count, stockLevel])

  const addQty = () => {
    setCount((prev) => (prev + 1 > stockLevel ? stockLevel : prev + 1))
  }

  const reductQty = () => {
    setCount((prev) => (prev - 1 < 1 ? 1 : prev - 1))
  }

  return (
    <Wrapper disable={soldOut}>
      {isMax ? (
        <span className="text-sm message">Max. qty of this size</span>
      ) : null}
      <button onClick={reductQty} disabled={soldOut}>
        <FiMinus />
      </button>
      <div className="count">{soldOut ? 0 : count}</div>
      <button onClick={addQty} disabled={soldOut}>
        <FiPlus />
      </button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  /* margin-left: -2rem; */

  width: max-content;
  text-align: center;
  position: relative;

  .message {
    position: absolute;
    top: -1rem;
    left: 50%;
    translate: -50%;
    white-space: nowrap;
    color: red;
  }

  & > button {
    padding: 1rem 2rem;
  }

  & > * {
    color: ${(props) => (props.disable ? "var(--grey-50)" : "var(--black)")};
    opacity: ${(props) => (props.disable ? "0.5" : "1")};
  }

  .count {
    min-width: 6rem;
    padding-inline: 1rem;

    font-size: 2rem;
  }
`
export default QtyController
