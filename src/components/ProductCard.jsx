import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { FaRegHeart, FaHeart } from "react-icons/fa"
import { formatPrice } from "../utils/helpers"
import { toggleFavorite } from "../features/products/productsSlice"
import {
  addToFavorites,
  removeFromFavorites,
} from "../features/favorite/favoriteSlice"
import { useDispatch } from "react-redux"

const ProductCard = ({ product }) => {
  const { name, sex, price, brand, images, id, sizeAvailable, favorite } =
    product
  const dispatch = useDispatch()

  useEffect(() => {
    if (favorite) dispatch(addToFavorites(product))
    else dispatch(removeFromFavorites(id))
  }, [favorite])

  const handleFavorite = () => {
    dispatch(toggleFavorite(id))
  }

  if (name === "") {
    return (
      <Wrapper>
        <div className="skeleton skeleton-img"></div>
        <div className="card-info">
          <div className="text-row">
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
          </div>
          <div className="text-group">
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text w-full"></div>
          </div>
          <div className="text-row">
            <div className="skeleton skeleton-price"></div>
            <div className="skeleton-icon">
              <FaHeart />
            </div>
          </div>
        </div>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <Link to={`/products/${id}`}>
        <div className="img-container skeleton">
          <img src={images[0].url} alt="product main visual" />
        </div>
      </Link>

      <div className="card-info">
        <div className="text-row">
          <span>{sex}</span>
          <span>
            {sizeAvailable.length === 1
              ? sizeAvailable[0]
              : `${sizeAvailable[0]} - ${sizeAvailable.at(-1)}`}
          </span>
        </div>
        <div className="text-group">
          <span className="brand">{brand}</span>
          <span className="product">{name}</span>
        </div>
        <div className="text-row">
          <span className="price">{formatPrice(price)}</span>
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
  --width: 22rem;
  width: var(--width);
  border: 1px solid var(--grey-50);
  border-radius: var(--border-radius-md);

  .skeleton {
    width: var(--width);
    height: 250px;
    animation: skeleton-loading 1s linear infinite alternate;

    &-img {
      border-top-left-radius: var(--border-radius-md);
      border-top-right-radius: var(--border-radius-md);
    }

    &-text {
      height: 15px;
      width: 30%;
    }

    &-price {
      height: 20px;
      width: 50%;
    }

    &-icon {
      height: 22px;
      width: 22px;
      font-size: 2.2rem;
      animation: skeleton-icon-loading 1s linear infinite alternate;
    }

    &.w-full {
      width: 100%;
      margin-top: 0.3rem;
    }
  }

  @keyframes skeleton-loading {
    0% {
      background-color: hsl(200, 20%, 70%);
    }

    100% {
      background-color: hsl(200, 20%, 95%);
    }
  }

  @keyframes skeleton-icon-loading {
    0% {
      color: hsl(200, 20%, 70%);
    }

    100% {
      color: hsl(200, 20%, 95%);
    }
  }

  .img-container {
    width: var(--width);
    height: 250px;
    background: url(${(props) => props.backgroundImage}) top center no-repeat;
    background-size: cover;

    border-top-left-radius: var(--border-radius-md);
    border-top-right-radius: var(--border-radius-md);
    overflow: hidden;
    cursor: pointer;

    &:hover img {
      scale: 1.1;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: all 0.2s;
    }
  }

  .card-info {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    text-transform: capitalize;
    font-weight: var(--fw-light);

    .brand {
      font-weight: var(--fw-semi);
    }

    .product {
      width: calc(80%);
      font-size: 1.4rem;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .price {
      font-size: 2rem;
      font-weight: var(--fw-bold);
    }

    .icon {
      color: var(--primary-500);
      margin-bottom: 0.3rem;
      font-size: 2.2rem;
      transition: all 0.2s;
      cursor: pointer;

      &:hover {
        scale: 1.2;
      }
    }
  }
  .text-group {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  .text-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
  }
`

export default ProductCard
