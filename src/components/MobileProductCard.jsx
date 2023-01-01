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

const MobileProductCard = ({ product }) => {
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
            {sizeAvailable[0]} - {sizeAvailable.at(-1)}
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
  /* width: 100%; */
  display: grid;
  grid-template-columns: 11rem 22rem;
  border: 1px solid var(--grey-50);
  border-radius: var(--border-radius-md);

  .img-container {
    height: 100%;

    border-top-left-radius: var(--border-radius-md);
    border-bottom-left-radius: var(--border-radius-md);
    overflow: hidden;
    cursor: pointer;

    img {
      height: 100%;
    }
  }

  .card-info {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
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

export default MobileProductCard
