import React from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  updateFilter,
  clearFilter,
  filterProducts,
  updatePage,
} from "../features/filter/filterSlice"
import styled from "styled-components"
import {
  formatPrice,
  getUniqueValues,
  getCategoriesInOrder,
} from "../utils/helpers"

const Filters = () => {
  const { allProducts, filters } = useSelector((store) => store.filter)
  const { text, brand, sex, category, color, minPrice, maxPrice, price } =
    filters
  const dispatch = useDispatch()

  const allColors = getUniqueValues(allProducts, "colors")
  const sexes = getUniqueValues(allProducts, "sex")
  let brands = getUniqueValues(allProducts, "brand")
  let categories = getUniqueValues(allProducts, "category")
  // re-order the array
  brands = getCategoriesInOrder(brands)
  categories = getCategoriesInOrder(categories)

  const handleChange = (e) => {
    let name = e.target.name
    let value = e.target.value
    if (name === "category" || name === "sex") value = e.target.textContent
    if (name === "color") value = e.target.dataset.color
    if (name === "price") value = +e.target.value
    dispatch(updateFilter({ name, value }))
    dispatch(filterProducts())
    dispatch(updatePage(1))
  }

  return (
    <Wrapper>
      <form>
        <div className="form-control">
          <input
            type="text"
            name="text"
            placeholder="search"
            className="search-input"
            value={text}
            onChange={handleChange}
          />
        </div>
        <div className="form-control control-categories">
          <h5>Gender</h5>
          {sexes.map((s, i) => (
            <button
              key={i}
              name="sex"
              type="button"
              onClick={handleChange}
              className={sex === s.toLowerCase() ? "active" : null}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="form-control control-categories">
          <h5>Category</h5>
          {categories.map((c, i) => (
            <button
              key={i}
              name="category"
              type="button"
              onClick={handleChange}
              className={category === c.toLowerCase() ? "active" : null}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="form-control">
          <h5>Brands</h5>
          <select
            name="brand"
            value={brand}
            onChange={handleChange}
            className="brand"
          >
            {brands.map((b, i) => (
              <option key={i} name="brand" value={b} onClick={handleChange}>
                {b}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control">
          <h5>Colors</h5>
          <div className="colors">
            {allColors.map((c, i) => {
              if (c === "all") {
                return (
                  <button
                    key={i}
                    name="color"
                    type="button"
                    className={color === c ? "all-btn active" : "all-btn"}
                    onClick={handleChange}
                  >
                    all
                  </button>
                )
              }
              return (
                <button
                  key={i}
                  name="color"
                  type="button"
                  style={{ backgroundColor: c }}
                  className={color === c ? "color-btn active" : "color-btn"}
                  data-color={c}
                  onClick={handleChange}
                ></button>
              )
            })}
          </div>
        </div>
        <div className="form-control">
          <h5>Price</h5>
          <p className="price">{formatPrice(price)}</p>
          <input
            type="range"
            name="price"
            onChange={handleChange}
            min={minPrice}
            max={maxPrice}
            value={price}
            className="range"
          />
        </div>
        <button
          className="btn btn--fill-black"
          type="button"
          onClick={() => {
            dispatch(clearFilter())
            dispatch(filterProducts())
          }}
        >
          clear filter
        </button>
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  form {
    display: grid;
    gap: 2rem;
  }

  h5 {
    margin-bottom: 0.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid black;
  }

  .control-categories {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;

    & button {
      align-self: flex-start;
      text-transform: capitalize;
      border-bottom: 1px solid transparent;
      transition: all 0.2s;

      &:hover {
        color: var(--primary-500);
      }

      &.active {
        color: var(--primary-700);
        font-weight: var(--fw-semi);
      }
    }
  }

  select {
    text-transform: capitalize;

    &:focus {
      outline: 2px solid var(--primary-500);
      outline-offset: 2px;
      border-radius: 5px;
    }
  }

  .colors {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    padding-top: 0.5rem;

    .all-btn {
      text-transform: capitalize;
    }

    .color-btn {
      --size: 1.5rem;
      width: var(--size);
      height: var(--size);
      border-radius: 50%;
      text-transform: capitalize;
      outline: 1px solid var(--grey-500);
      opacity: 0.65;
      transition: all 0.1s;

      &:hover {
        opacity: 1;
      }

      &:first-child {
        margin-top: 2px;
      }

      &.active {
        opacity: 1;
        outline: 2px solid var(--primary-500);
        outline-offset: 2px;
      }
    }
  }
`
export default Filters
