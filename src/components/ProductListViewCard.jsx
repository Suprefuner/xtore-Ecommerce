import styled from "styled-components"
import { formatPrice, calcDiscounted } from "../utils/helpers"
import { FaRegHeart, FaHeart } from "react-icons/fa"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import {
  addToFavorites,
  removeFromFavorites,
} from "../features/favorite/favoriteSlice"
import { toggleFavorite } from "../features/products/productsSlice"

const ProductListViewCard = ({ product }) => {
  const {
    name,
    price,
    originalPrice,
    brand,
    image,
    id,
    sizeAvailable,
    description,
    favorite,
  } = product

  const dispatch = useDispatch()

  useEffect(() => {
    if (favorite) dispatch(addToFavorites(product))
    else dispatch(removeFromFavorites(id))
  }, [favorite])

  const isDiscounted = !(price === originalPrice)

  const handleFavorite = () => {
    dispatch(toggleFavorite(id))
  }

  return (
    <Wrapper className="card" key={id}>
      <div className="img-container">
        <img src={image} alt="main product visual" />
      </div>
      <div className="info">
        <div className="text-row">
          <h2>{brand}</h2>
          {/* <FaRegHeart className="icon" /> */}
          {favorite ? (
            <FaHeart className="icon" onClick={handleFavorite} />
          ) : (
            <FaRegHeart className="icon" onClick={handleFavorite} />
          )}
        </div>
        <div className="text-row">
          <span>{name}</span>
          <span>
            {sizeAvailable[0]} - {sizeAvailable.at(-1)}
          </span>
        </div>
        <div className="text-row">
          <span className="price">
            {formatPrice(price)}{" "}
            {isDiscounted && (
              <span className="discount">
                {calcDiscounted(price, originalPrice)}
              </span>
            )}
          </span>
          {isDiscounted && (
            <span className="text-sm">{formatPrice(originalPrice)}</span>
          )}
        </div>
        <div className="text-row">
          <ul className="description">
            {description
              .split(",")
              .slice(2, 6)
              .map((point) => (
                <li>{point}</li>
              ))}
          </ul>
          <span className="more">...</span>
        </div>
        <Link to={`/products/${id}`} className="button">
          <button className="btn btn--fill-primary">details</button>
        </Link>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  border: 1px solid var(--grey-50);
  border-radius: var(--border-radius-md);

  .img-container {
    width: 40%;
    height: 100%;

    border-top-left-radius: var(--border-radius-md);
    border-bottom-left-radius: var(--border-radius-md);
    overflow: hidden;

    &:hover img {
      scale: 1.1;
    }

    img {
      transition: all 0.2s;
    }
  }

  .info {
    width: 60%;
    padding: 3rem;

    display: flex;
    flex-direction: column;
    gap: 1.2rem;

    font-weight: var(--fw-light);
    text-transform: capitalize;

    .brand {
      font-weight: var(--fw-semi);
    }

    .price {
      display: flex;
      align-items: center;
      gap: 0.7rem;

      font-size: 2rem;
      font-weight: var(--fw-bold);
    }

    .discount {
      font-size: 1.4rem;
      font-weight: var(--fw-semi);
    }

    .icon {
      color: var(--primary-500);
      margin-bottom: 0.3rem;
      font-size: 2.2rem;
      transition: 0.2s;
      cursor: pointer;

      &:hover {
        scale: 1.2;
      }
    }
  }

  .text-row {
    display: flex;
    align-items: center;
    justify-content: space-between;

    & .more {
      align-self: end;
      font-size: 3rem;
    }
  }

  .button {
    margin-top: auto;

    button {
      width: 100%;
    }
  }
`

export default ProductListViewCard
