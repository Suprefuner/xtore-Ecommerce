import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { BsGridFill, BsList } from "react-icons/bs"
import styled from "styled-components"
import {
  setGridView,
  setListView,
  updateSort,
  sortProducts,
} from "../features/filter/filterSlice"

const Sort = () => {
  const {
    filteredProducts: products,
    gridView,
    sort,
  } = useSelector((store) => store.filter)
  const dispatch = useDispatch()

  const handleChange = (e) => {
    dispatch(updateSort(e.target.value))
    dispatch(sortProducts())
  }

  return (
    <Wrapper>
      <div className="buttons">
        <button
          className={`${gridView ? "active" : null}`}
          onClick={() => dispatch(setGridView())}
        >
          <BsGridFill />
        </button>
        <button
          className={`${!gridView ? "active" : null}`}
          onClick={() => dispatch(setListView())}
        >
          <BsList className="list-icon" />
        </button>
      </div>
      <p>{products.length} products found</p>
      <hr />
      <form>
        <label htmlFor="sort">sort by</label>
        <select name="sort" id="sort" value={sort} onChange={handleChange}>
          <option value="price-lowest">price(lowest)</option>
          <option value="price-highest">price(highest)</option>
          <option value="name-a">name(a-z)</option>
          <option value="name-z">name(z-a)</option>
        </select>
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: auto auto 1fr auto;
  gap: 2rem;
  margin-bottom: 3rem;

  button {
    --size: 3rem;
    width: var(--size);
    height: var(--size);
    border: 1px solid var(--black);

    & > * {
      margin-top: 0.5rem;
    }

    &.active {
      color: white;
      background-color: var(--black);
    }

    &:not(:last-child) {
      margin-right: 0.5rem;
    }
  }

  select {
    padding: 0.5rem;

    &:focus {
      outline: 2px solid var(--primary-500);
      outline-offset: 2px;
      border-radius: 5px;
    }
  }

  label {
    margin-right: 1rem;
  }
`

export default Sort
