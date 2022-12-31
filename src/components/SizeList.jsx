import React from "react"
import styled from "styled-components"

const SizeList = ({
  sizes,
  sizeAvailable,
  setStockLevel,
  stock,
  currentSize,
  setCurrentSize,
}) => {
  return (
    <Wrapper className="size-list">
      {sizes.map((size, i) => (
        <button
          key={i}
          className={`
          ${sizeAvailable.includes(size) ? "" : "disable"} 
          ${size === currentSize ? "active" : ""}`}
          onClick={() => {
            setStockLevel(stock[size])
            setCurrentSize(sizes[i])
          }}
          disabled={!sizeAvailable.includes(size)}
        >
          {size}
        </button>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;

  button {
    --size: 4rem;
    width: var(--size);
    height: var(--size);

    line-height: var(--size);
    text-align: center;
    border: 1px solid var(--grey-300);
    user-select: none;

    &.active {
      color: white;
      background-color: var(--primary-300);
      border: none;
    }

    &.disable {
      color: var(--grey-300);
      background-color: var(--grey-50);
      position: relative;
      cursor: not-allowed;
    }
  }
`

export default SizeList
