import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import styled from "styled-components"
import { FaRegHeart, FaHeart } from "react-icons/fa"
import { toggleFavorite } from "../features/products/productsSlice"
import {
  addToFavorites,
  removeFromFavorites,
} from "../features/favorite/favoriteSlice"

const SingleProductImageSlider = ({ product }) => {
  const { name, sex, price, brand, images, id, sizeAvailable, favorite } =
    product
  const [mainImage, setMainImage] = useState(images[0])
  const [isFavorite, setIsFavorite] = useState(false)
  const { products } = useSelector((store) => store.products)
  const { favorites } = useSelector((store) => store.favorite)
  const dispatch = useDispatch()

  // FIXME
  // check if this product already in favorites list
  useEffect(() => {
    setIsFavorite(!!favorites.find((products) => products.id === id))
  }, [])

  useEffect(() => {
    if (favorite) dispatch(addToFavorites(product))
    else dispatch(removeFromFavorites(id))
  }, [favorite])

  const handleFavorite = () => {
    dispatch(toggleFavorite(id))
  }

  return (
    <Wrapper>
      <div className="images">
        {images.map((image, i) => (
          <div key={i} className={mainImage.id === image.id ? "active" : null}>
            <img
              src={image.url}
              alt="product image"
              onClick={() => setMainImage(images[i])}
            />
          </div>
        ))}
      </div>
      <div className="mainImage">
        <img src={mainImage.url} alt="product main image" />
        <div className="icon">
          {favorite ? (
            <FaHeart className="icon" onClick={handleFavorite} />
          ) : (
            <FaRegHeart className="icon" onClick={handleFavorite} />
          )}
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  gap: 1rem;
  overflow: hidden;

  @media (max-width: 640px) {
    display: grid;
    border-bottom: 1px solid black;
    padding-bottom: 3rem;
  }

  img {
    height: 100%;
    transition: 0.2s;
  }

  .images {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 25%;
    overflow-y: scroll;

    @media (max-width: 640px) {
      order: 1;
      flex-direction: row;
      width: 100%;
    }

    &::-webkit-scrollbar {
      width: 0;
    }

    img {
      cursor: pointer;
    }

    .active {
      border: 1px solid var(--primary-500);

      img {
        opacity: 0.7;
      }
    }
  }

  .mainImage {
    width: 75%;
    position: relative;

    @media (max-width: 640px) {
      width: 100%;
    }
  }

  .icon {
    --padding: 2rem;
    position: absolute;
    top: var(--padding);
    right: var(--padding);
    transform: translate(50%, -50%);
    font-size: 3rem;
    color: var(--primary-500);
    transition: all 0.2s;

    cursor: pointer;

    &:hover {
      scale: 1.1;
    }
  }
`

export default SingleProductImageSlider
