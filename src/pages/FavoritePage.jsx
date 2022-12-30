import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
// import { getFavorite } from "../features/favorite/favoriteSlice"
import { FavoriteFilter } from "../components"
import styled from "styled-components"
import { PageHero, ProductCard } from "../components"
import { getProducts } from "../features/favorite/favoriteSlice"
import { getFavoriteFromLocalStorage } from "../utils/localStorage"

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
        <section>
          {filteredFavorites.map((product) => (
            <ProductCard key={product.id} product={product} />
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
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    justify-items: center;
    row-gap: 3rem;
    padding-block: 3rem;
  }
`

export default FavoritePage
