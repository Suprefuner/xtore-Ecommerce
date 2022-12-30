import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import styled from "styled-components"

import { getProducts } from "../features/filter/filterSlice"
import { PageHero, Filter, Sort, ProductsList } from "../components"
import { filterProducts } from "../features/favorite/favoriteSlice"

const ProductsPage = () => {
  const { products } = useSelector((store) => store.products)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProducts(products))
  }, [products])

  return (
    <main>
      <PageHero />
      <Wrapper className="container">
        <div>
          <Filter />
        </div>
        <div>
          <Sort />
          <ProductsList />
        </div>
      </Wrapper>
    </main>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto 70rem;
  gap: 2rem;
  margin-block: 3rem;
`

export default ProductsPage
