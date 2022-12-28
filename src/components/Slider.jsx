import React from "react"
import ProductCard from "./ProductCard"
import styled from "styled-components"
import { useSelector } from "react-redux"

const Slider = () => {
  const { trendingProducts } = useSelector((store) => store.products)
  return (
    <Wrapper>
      {trendingProducts.map((product) => (
        <ProductCard key={product.id} {...product} />
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
