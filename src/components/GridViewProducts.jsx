import React from "react"
import styled from "styled-components"
import ProductCard from "./ProductCard"

const GridViewProducts = ({ products }) => {
  return (
    <Wrapper>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
`

export default GridViewProducts
