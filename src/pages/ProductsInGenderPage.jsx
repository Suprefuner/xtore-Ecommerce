import { useState, useEffect } from "react"
import styled from "styled-components"
import { PageHero, Slider } from "../components"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { getUniqueValues, getCategoriesInOrder } from "../utils/helpers"
import { updateFilter, filterProducts } from "../features/filter/filterSlice"

const ProductInGenderPage = ({ sex }) => {
  const [gender, setGender] = useState("")
  const { products } = useSelector((store) => store.products)
  const dispatch = useDispatch()

  useEffect(() => {
    setGender(sex)
  }, [])

  const productsInGender = products.filter((product) => product.sex === gender)
  const categories = getUniqueValues(productsInGender, "category")

  const categoriesInOrder = getCategoriesInOrder(categories)

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
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint
            fugiat harum esse! At similique maiores accusantium autem earum, qui
            magni enim ipsa officia temporibus possimus necessitatibus quisquam
            neque beatae vero. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Necessitatibus soluta pariatur dolor accusantium
            similique consequatur explicabo, assumenda voluptatibus excepturi
            expedita.
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
                products={productsInGender
                  .filter((product) => product.category === cat)
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
