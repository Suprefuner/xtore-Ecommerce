import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import styled from "styled-components"

import { getProducts, sortProducts } from "../features/filter/filterSlice"
import { PageHero, Filter, Sort, ProductsList, CartModal } from "../components"

const ProductsPage = () => {
  const [touchStart, setTouchStart] = useState(0)
  const [isSwipeRight, setIsSwipeRight] = useState(false)
  const { products } = useSelector((store) => store.products)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProducts(products))
    dispatch(sortProducts())
  }, [products])

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].pageX)
  }

  const handleTouchMove = (e) => {
    if (e.touches[0].pageX - touchStart > 100) setIsSwipeRight(true)
    else setIsSwipeRight(false)
  }

  return (
    <main>
      <PageHero />
      <Wrapper
        className="container"
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
      >
        <div className={`filter ${isSwipeRight ? "" : "hide"}`}>
          <Filter />
        </div>
        <main>
          <Sort />
          <ProductsList />
        </main>
      </Wrapper>
    </main>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto 70rem;
  gap: 2rem;
  margin-block: 3rem;
  position: relative;

  @media (max-width: 640px) {
    position: relative;
    padding-inline: 2rem;
    grid-template-columns: 1fr;
    min-height: calc(100vh - 20.5rem - 154px);
  }

  .filter {
    background-color: white;
    position: -webkit-sticky;
    position: sticky;
    top: 20rem;

    @media (max-width: 640px) {
      position: absolute;
      top: -3rem;
      left: 0;
      z-index: 500;

      padding: 3rem;
      border-right: 1px solid black;
      border-bottom: 1px solid black;
      transition: all 0.2s;

      &.hide {
        transform: translateX(-100%);
      }
    }
  }

  .modal {
    @media (max-width: 640px) {
      position: fixed;
      top: 22rem;
      left: 50%;
      transform: translateX(-50%);
      z-index: 100;
    }
  }
`

export default ProductsPage
