import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { FavoriteFilter } from "../components"
import styled from "styled-components"
import { PageHero, ProductCard, MobileProductCard } from "../components"
import { getProducts } from "../features/favorite/favoriteSlice"

const FavoritePage = () => {
  const { products } = useSelector((store) => store.products)
  // const favorites = products.filter((product) => product.favorite)
  const { filteredFavorites } = useSelector((store) => store.favorite)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProducts(products))
  }, [products])

  return (
    <main style={{ minHeight: `calc(100vh - 7rem - 154px)` }}>
      <PageHero />
      <Wrapper className="container">
        <FavoriteFilter />
        <section className="section--desktop">
          {filteredFavorites.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
        <section className="section--mobile">
          {filteredFavorites.map((product) => (
            <MobileProductCard key={product.id} product={product} />
          ))}
        </section>
      </Wrapper>
    </main>
  )
}

const Wrapper = styled.div`
  padding-top: 3rem;

  section {
    display: grid;
    row-gap: 3rem;
    padding-block: 3rem;
  }

  .section--desktop {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    justify-items: center;

    @media (max-width: 640px) {
      display: none;
    }
  }

  .section--mobile {
    @media (min-width: 641px) {
      display: none;
    }
  }
`

export default FavoritePage
