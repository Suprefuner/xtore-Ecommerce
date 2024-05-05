import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { useParams, useNavigate } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"

import { fetchSingleProduct } from "../features/singleProduct/singleProductSlice"
import { formatPrice, calcDiscounted } from "../utils/helpers"
import {
  Loading,
  Error,
  PageHero,
  SingleProductImageSlider,
  QtyController,
  SizeList,
  Stars,
} from "../components"
import { addToCart, countCartTotal } from "../features/cart/cartSlice"
import { setCartItemToLocalStorage } from "../utils/localStorage"

const SingleProductPage = () => {
  const { id } = useParams()
  const { isLoading, error, product } = useSelector(
    (store) => store.singleProduct
  )
  const { products } = useSelector((store) => store.products)
  const { cart } = useSelector((store) => store.cart)

  const [stockLevel, setStockLevel] = useState(2)
  const [isMax, setIsMax] = useState(false)
  const [currentSize, setCurrentSize] = useState(0)
  const [count, setCount] = useState(1)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchSingleProduct({ id }))
  }, [id])

  useEffect(() => {
    setCurrentSize(product.currentSize)
  }, [product])

  useEffect(() => {
    setCartItemToLocalStorage(cart)
    dispatch(countCartTotal())
  }, [cart])

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        navigate("/")
      }, 2000)
    }
  }, [error])

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <Error />
  }

  if (!product.fields || !products.length) return null

  const { soldOut, sizeAvailable, stock } = product
  const {
    colors,
    description,
    images,
    stars,
    brand,
    originalPrice,
    name,
    price,
    sizes
  } = product.fields

  const isDiscounted = !(price === originalPrice)

  const handleAddCart = () => {
    const productCopy = { ...product }
    productCopy.color = productCopy.fields.colors[0]
    const sizeIndex = productCopy.fields.sizes.indexOf(currentSize)
    productCopy.max = +productCopy.fields.stock.split(',')[sizeIndex]

    const tempFields = { ...productCopy.fields }

    delete tempFields.sizes
    delete tempFields.stock
    delete tempFields.colors
    delete productCopy.sizeAvailable

    const cartItem = {
      ...productCopy,
      fields: { ...tempFields },
      size: currentSize,
      quantity: count,
    }

    dispatch(
      addToCart({
        ...cartItem,
        size: currentSize,
        quantity: count,
      })
    )


    // dispatch(
    //   addToCart({
    //     ...productCopy,
    //     size: currentSize,
    //     quantity: count,
    //   })
    // )
  }

  return (
    <Wrapper>
      <PageHero product title={name} />
      <div className="container">
        <section className="section--display">
          <SingleProductImageSlider
            images={images}
            id={id}
            product={products.find((product) => product.id === id)}
          />
          <div className="info">
            <h2 className="brand">{brand}</h2>
            <div className="text-row">
              <span className="name">{name}</span>
              <Stars stars={stars} />
            </div>
            <div className="text-row">
              <span className="price">
                {formatPrice(price)}{" "}
                {isDiscounted ? (
                  <span className="discount">
                    {calcDiscounted(price, originalPrice)}
                  </span>
                ) : null}
              </span>
              <span className="text-sm">
                original: {formatPrice(isDiscounted ? originalPrice : price)}
              </span>
            </div>
            <div className="colors">
              color:{" "}
              {colors.map((color) => (
                <Color key={color} className="color" fillColor={color}></Color>
              ))}
            </div>
            <div className="text-group">
              <span>size:</span>
              <SizeList
                sizes={sizes}
                sizeAvailable={sizeAvailable}
                stock={stock}
                setStockLevel={setStockLevel}
                setIsMax={setIsMax}
                currentSize={currentSize}
                setCurrentSize={setCurrentSize}
              />
            </div>
            {sizeAvailable.length ? (
              <div className="controller">
                <QtyController
                  stockLevel={stockLevel}
                  isMax={isMax}
                  setIsMax={setIsMax}
                  count={count}
                  setCount={setCount}
                  className="controller"
                />
              </div>
            ) : (
              <p className="message">sold out</p>
            )}
            <div className="buttons">
              <Link to="/checkout">
                <button
                  className={`btn ${soldOut ? "btn--disable" : "btn--stroke"}`}
                  disabled={soldOut}
                  onClick={handleAddCart}
                >
                  buy now
                </button>
              </Link>
              <button
                className={`btn ${soldOut ? "btn--disable" : "btn--fill-black"
                  }`}
                disabled={soldOut}
                onClick={handleAddCart}
              >
                add to cart
              </button>
            </div>
          </div>
        </section>
        <section className="section--description">
          <div className="description">
            <h3>detail</h3>
            <ul>
              {description.split(",").map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.main`
  text-transform: capitalize;

  .container {
    @media (max-width: 640px) {
      padding-inline: 2rem;
    }
  }

  section {
    padding-block: 3rem;
  }

  .section--display {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;

    height: 48rem;
    border-bottom: 1px solid var(--black);

    @media (max-width: 640px) {
      grid-template-columns: 1fr;
      height: auto;
    }
  }

  .info {
    display: grid;
    gap: 2rem;
    height: 42rem;
  }

  .brand {
    font-size: 5rem;
  }

  .stars {
    color: var(--primary-500);
    min-width: max-content;
  }

  .text-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .price {
    display: flex;
    align-items: center;
    gap: 0.7rem;

    font-size: 2.5rem;
    font-weight: var(--fw-bold);
  }

  .discount {
    font-size: 1.4rem;
    font-weight: var(--fw-semi);
  }
  .colors {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .message {
    color: red;
  }

  .controller {
    margin-left: -1rem;
  }
  .buttons {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 3rem;

    & button {
      width: 100%;
      height: 100%;
    }
  }

  .description {
    padding-left: 2rem;

    @media (max-width: 640px) {
      padding-left: 0;
    }

    h3 {
      margin-bottom: 2rem;
    }

    ul {
      list-style: initial;
      columns: 2;
      padding-inline: 3rem;

      @media (max-width: 640px) {
        padding-inline: 2rem;
        font-size: 1.4rem;
      }

      li {
        margin-bottom: 0.5rem;
      }
    }
  }
`

const Color = styled.div`
  --size: 2rem;
  width: var(--size);
  height: var(--size);
  background-color: ${(props) => props.fillColor};
  border-radius: 50%;
  border: 1px solid var(--grey-300);
  cursor: pointer;
`

export default SingleProductPage
