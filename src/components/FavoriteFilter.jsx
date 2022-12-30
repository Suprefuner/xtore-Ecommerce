import React from "react"
import styled from "styled-components"
import { useSelector, useDispatch } from "react-redux"
import { getUniqueValues } from "../utils/helpers"
import {
  updateFilter,
  updateSort,
  filterProducts,
  sortProducts,
} from "../features/favorite/favoriteSlice"

const FavoriteFilter = () => {
  const { favorites, filters, sort } = useSelector((store) => store.favorite)
  const { text, brand, sex, category, color } = filters
  const dispatch = useDispatch()

  const brands = getUniqueValues(favorites, "brand")
  const sexs = getUniqueValues(favorites, "sex")
  const categories = getUniqueValues(favorites, "category")
  const colors = getUniqueValues(favorites, "colors")

  const handleChange = (e) => {
    let name = e.target.name
    let value = e.target.value
    if (name === "sort") {
      dispatch(updateSort(value))
      dispatch(sortProducts())
    } else {
      dispatch(updateFilter({ name, value }))
      dispatch(filterProducts())
    }
  }

  return (
    <Wrapper>
      <form>
        <div className="form-control">
          <input
            type="text"
            name="text"
            placeholder="product name"
            className="search-input"
            value={text}
            onChange={handleChange}
          />
        </div>

        <div className="form-control">
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
          <select
            name="sex"
            value={brand}
            onChange={handleChange}
            className="sex"
          >
            {sexs.map((s, i) => (
              <option key={i} name="sex" value={s} onClick={handleChange}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control">
          <select
            name="category"
            value={category}
            onChange={handleChange}
            className="category"
          >
            {categories.map((c, i) => (
              <option key={i} name="category" value={c} onClick={handleChange}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control">
          <select
            name="color"
            value={color}
            onChange={handleChange}
            className="color"
          >
            {colors.map((c, i) => (
              <option key={i} name="color" value={c} onClick={handleChange}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control">
          <select name="sort" id="sort" value={sort} onChange={handleChange}>
            <option value="price-lowest">price(lowest)</option>
            <option value="price-highest">price(highest)</option>
            <option value="name-a">name(a-z)</option>
            <option value="name-z">name(z-a)</option>
          </select>
        </div>
      </form>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  border: 1px solid black;
  padding: 1rem;

  form {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-content: stretch;
    gap: 2rem;

    .form-control {
      input[type="text"] {
        border-radius: 0;
      }

      &:not(:first-child) > * {
        padding: 0.7rem;
        width: 100%;
      }
    }
  }
`

export default FavoriteFilter
