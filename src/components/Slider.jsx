import React from "react"
import ProductCard from "./ProductCard"
import styled from "styled-components"

const Slider = ({ products }) => {
  return (
    <Wrapper>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  white-space: nowrap;
  gap: 2rem;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    /* width: 0; */
  }
`

export default Slider
