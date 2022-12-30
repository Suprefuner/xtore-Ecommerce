import React from "react"
import styled from "styled-components"

import ProductListViewCard from "./ProductListViewCard"

const ListViewProducts = ({ products }) => {
  return (
    <Wrapper>
      {products.map((product) => (
        <ProductListViewCard key={product.id} product={product} />
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  gap: 2rem;
`
export default ListViewProducts
