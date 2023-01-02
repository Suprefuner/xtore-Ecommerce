import React from "react"
import styled from "styled-components"
import ProductCard from "./ProductCard"
import MobileProductCard from "./MobileProductCard"

const GridViewProducts = ({ products }) => {
  return (
    <Wrapper>
      <div className="desktop">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="mobile">
        {products.map((product) => (
          <MobileProductCard key={product.id} product={product} />
        ))}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .desktop,
  .mobile {
    display: grid;
    gap: 2rem;
  }

  .desktop {
    grid-template-columns: repeat(3, 1fr);

    @media (max-width: 640px) {
      display: none;
    }
  }

  .mobile {
    grid-template-columns: 1fr;

    @media (min-width: 641px) {
      display: none;
    }
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

export default GridViewProducts
