import { Link } from "react-router-dom"
import styled from "styled-components"

const Separator = () => <span className="separator">/</span>

const PageHero = ({ product, title }) => {
  const { pathname } = window.location

  return (
    <Wrapper>
      <p className="container">
        <Link to="/">home</Link>
        {product && (
          <Link to="/products">
            <Separator />
            products{" "}
          </Link>
        )}
        <Separator />
        <span className="current">{title ? title : pathname.slice(1)}</span>
      </p>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background-color: var(--grey-500);
  color: var(--white);
  text-transform: capitalize;
  padding-block: 1.5rem;
  font-size: 1.4rem;

  .container {
    display: flex;
  }

  & * {
    color: inherit;
  }

  .separator {
    margin-inline: 1rem;
  }
`

export default PageHero
