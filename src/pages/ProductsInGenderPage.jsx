import { useState, useEffect } from "react"
import styled from "styled-components"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"

import { pageDescription } from "../utils/constants"
import { getUniqueValues, getCategoriesInOrder } from "../utils/helpers"
import { updateFilter, filterProducts } from "../features/filter/filterSlice"

import { PageHero, Slider } from "../components"

const ProductInGenderPage = ({ sex }) => {
  const [gender, setGender] = useState("")
  const [genderProducts, setGenderProducts] = useState([]);
  const [categoriesInOrder, setCategoriesInOrder] = useState([]);
  const { products } = useSelector((store) => store.products)
  const dispatch = useDispatch()

  useEffect(() => {
    const genderProduct = products.filter(
      ({ fields }) => fields.sex === sex)
    const categories = getUniqueValues(genderProduct, "category")

    setGender(sex)
    setGenderProducts(genderProduct)
    setCategoriesInOrder(getCategoriesInOrder(categories))
  }, [products, sex])

  const handleClick = (category) => {
    dispatch(updateFilter({ name: "sex", value: gender }))
    dispatch(updateFilter({ name: "category", value: category }))
    dispatch(filterProducts())
  }


  return (
    <Wrapper>
      <PageHero title={gender} />
      <section className="section--hero">
        <div className="container">
          <h2>{gender}</h2>
          <p>
            {pageDescription[gender]}
          </p>
        </div>
      </section>
      <div className="container">
        <section className="section--slider">
          {categoriesInOrder.slice(1).map((cat, i) => (
            <div key={i} className="slider-container">
              <div className="header">
                <h2 className="title">{cat}</h2>
                <Link to="/products" onClick={() => handleClick(cat)}>
                  <button className="btn--text">shop more...</button>
                </Link>
              </div>
              <Slider
                products={genderProducts
                  .filter(({ fields }) => fields.category === cat)
                  .slice(0, 5)}
              />
            </div>
          ))}
        </section>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.main`
  .section--hero {
    width: 100%;
    height: 20rem;
    background-image: linear-gradient(
      135deg,
      var(--primary-300),
      var(--primary-500)
    );

    padding-block: 2rem;

    h2 {
      margin-bottom: 1rem;
    }

    p {
      @media (max-width: 640px) {
        display: -webkit-box;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
      }
    }
  }

  .section--slider {
    display: flex;
    flex-direction: column;
    gap: 3rem;

    padding-block: 3rem;
  }
  .header {
    display: flex;
    align-items: center;
    gap: 2rem;
    margin-bottom: 1rem;

    .btn--text {
      margin-top: 1rem;
      text-transform: capitalize;

      color: var(--primary-600);
      font-weight: var(--fw-semi);
    }
  }
`

export default ProductInGenderPage
