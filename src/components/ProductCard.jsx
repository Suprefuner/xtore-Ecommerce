import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { FaRegHeart } from "react-icons/fa"
import { formatPrice } from "../utils/helpers"

const ProductCard = ({
  name,
  sex,
  category,
  price,
  colors,
  brand,
  size,
  images,
  id,
  sizeAvailable,
}) => {
  return (
    <Wrapper to={`/products/${id}`}>
      <div className="img-container">
        <img src={images[0].url} alt="product main visual" />
      </div>

      <div className="info">
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
          <FaRegHeart className="icon" />
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled(Link)`
  width: 220px;
  border: 1px solid var(--grey-50);
  border-radius: var(--border-radius-md);
  cursor: pointer;

  .img-container {
    width: 220px;
    height: 250px;

    background: url(${(props) => props.backgroundImage}) top center no-repeat;
    background-size: cover;

    border-top-left-radius: var(--border-radius-md);
    border-top-right-radius: var(--border-radius-md);
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .info {
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
      /* FIXME */
      font-size: 1.2rem;

      /* width: calc(80%);
      font-size: 1.4rem;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap; */
    }

    .price {
      font-size: 2rem;
      font-weight: var(--fw-bold);
    }

    .icon {
      color: var(--primary-500);
      margin-bottom: 0.3rem;
      font-size: 2.2rem;
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
  }
`

export default ProductCard
