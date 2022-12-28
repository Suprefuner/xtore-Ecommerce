import React from "react"

const SizeList = ({
  sizes,
  sizeAvailable,
  setStockLevel,
  stock,
  currentSize,
  setCurrentSize,
}) => {
  return (
    <ul className="size-list">
      {sizes.map((size, i) => (
        <li
          key={i}
          className={`
          ${sizeAvailable.includes(size) ? "" : "disable"} 
          ${size === currentSize ? "active" : ""}`}
          onClick={() => {
            setStockLevel(stock[size])
            setCurrentSize(sizes[i])
          }}
        >
          {size}
        </li>
      ))}
    </ul>
  )
}

export default SizeList
